// src/services/jobService.ts

// Interface untuk data mentah dari API
export interface ApiJob {
  id: string;
  jobTitle: string;
  jobDescription: string;
  cleanedDescription: string;
  companyName?: string;
  city: string;
  aboutCompany: string;
  category: string;
  jobType: string;
  skillsRequired: string[];
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  isActive: boolean;
  postedAt: {
    _seconds: number;
    _nanoseconds: number;
  };
}

// Interface untuk respons API yang mengembalikan daftar pekerjaan
interface ApiResponse {
  jobs: ApiJob[];
  total?: number; // Tambahkan total untuk paginasi
}

// Interface untuk data yang telah diformat dan siap ditampilkan di UI
export interface DisplayJob {
  id: string;
  logo: string;
  companyName: string;
  title: string;
  disabilitas?: string;
  type: string[];
  location: string;
  posted: string;
  description: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  skillsRequired?: string[];
}

// Interface untuk parameter filter pada fungsi searchJobs
export interface SearchJobFilters {
  category?: string;
  location?: string;
  minSalary?: number;
  maxSalary?: number;
  companyName?: string;
  city?: string;
  jobTitle?: string;
  jobType?: string; // Tambahkan jobType
}

const API_BASE_URL = 'https://jobmate-rest-api-819767094904.asia-southeast2.run.app';

// Fungsi helper untuk fetch dengan timeout
const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 10000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

// Fungsi helper untuk memformat tanggal posting
const formatPostedDate = (postedAtSeconds: number): string => {
  if (typeof postedAtSeconds !== 'number') return "Tanggal tidak valid";
  const date = new Date(postedAtSeconds * 1000);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (isNaN(diffDays) || diffDays < 0) return "Tanggal tidak valid";

  if (diffDays === 0) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      if (diffMinutes < 1) return "Baru saja";
      return `${diffMinutes} menit yang lalu`;
    }
    return `${diffHours} jam yang lalu`;
  } else if (diffDays === 1) {
    return "Kemarin";
  } else if (diffDays <= 30) {
    return `${diffDays} hari yang lalu`;
  } else {
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  }
};

// Fungsi helper untuk mentransformasi data API mentah menjadi DisplayJob
const transformApiJobToDisplayJob = (apiJob: ApiJob): DisplayJob => {
  const companyName = apiJob.companyName || "Perusahaan Tidak Diketahui";
  let description = `Kami sedang mencari seorang ${apiJob.jobTitle.toLowerCase()}...`;
  if (apiJob.jobDescription) {
    description = apiJob.jobDescription.length > 150
      ? apiJob.jobDescription.substring(0, 147) + "..."
      : apiJob.jobDescription;
  }

  return {
    id: apiJob.id,
    logo: companyName,
    companyName: companyName,
    title: apiJob.jobTitle,
    type: [apiJob.jobType],
    location: apiJob.city,
    posted: apiJob.postedAt ? formatPostedDate(apiJob.postedAt._seconds) : "Tanggal tidak tersedia",
    description: description,
    salary: apiJob.salary,
    skillsRequired: apiJob.skillsRequired || [],
  };
};

// Fungsi untuk mengambil pekerjaan terbaru (untuk homepage)
export const fetchRecentJobs = async (): Promise<DisplayJob[]> => {
  const start = performance.now();
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/jobs/recent`);
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Error fetching recent jobs: ${response.status} ${response.statusText}`, errorBody);
      throw new Error(`Error fetching recent jobs: ${response.status} ${response.statusText}`);
    }
    const data: ApiResponse = await response.json();
    if (!data.jobs || !Array.isArray(data.jobs)) {
      console.error("Invalid data structure for recent jobs:", data);
      return [];
    }
    console.log(`fetchRecentJobs took ${performance.now() - start}ms`);
    return data.jobs.map(transformApiJobToDisplayJob);
  } catch (error: unknown) {
    console.log(`fetchRecentJobs failed after ${performance.now() - start}ms`);
    if (error instanceof Error) {
      console.error("Failed to fetch recent jobs:", error.message);
    } else {
      console.error("An unknown error occurred while fetching recent jobs:", error);
    }
    return [];
  }
};

// Fungsi untuk mencari pekerjaan dengan filter dan paginasi
export const searchJobs = async (filters: SearchJobFilters, page: number = 1, limit: number = 6): Promise<{ jobs: DisplayJob[], total: number }> => {
  const start = performance.now();
  const queryParams = new URLSearchParams();
  if (filters.category) queryParams.append('category', filters.category);
  if (filters.location) queryParams.append('location', filters.location);
  if (filters.minSalary) queryParams.append('minSalary', String(filters.minSalary));
  if (filters.maxSalary) queryParams.append('maxSalary', String(filters.maxSalary));
  if (filters.companyName) queryParams.append('companyName', filters.companyName);
  if (filters.city) queryParams.append('city', filters.city);
  if (filters.jobTitle) queryParams.append('jobTitle', filters.jobTitle);
  if (filters.jobType) queryParams.append('jobType', filters.jobType);
  queryParams.append('page', String(page));
  queryParams.append('limit', String(limit));

  const url = `${API_BASE_URL}/jobs?${queryParams.toString()}`;
  try {
    const response = await fetchWithTimeout(url);
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Error searching jobs: ${response.status} ${response.statusText}`, errorBody);
      throw new Error(`Error searching jobs: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    if (!data.jobs || !Array.isArray(data.jobs)) {
      console.error("Invalid data structure for searched jobs:", data);
      return { jobs: [], total: 0 };
    }
    console.log(`searchJobs took ${performance.now() - start}ms`);
    return {
      jobs: data.jobs.map(transformApiJobToDisplayJob),
      total: data.total || data.jobs.length,
    };
  } catch (error: unknown) {
    console.log(`searchJobs failed after ${performance.now() - start}ms`);
    if (error instanceof Error) {
      console.error("Failed to search jobs:", error.message);
    } else {
      console.error("An unknown error occurred while searching jobs:", error);
    }
    return { jobs: [], total: 0 };
  }
};

// Fungsi untuk mengambil detail pekerjaan berdasarkan ID
export const fetchJobById = async (jobId: string): Promise<ApiJob | null> => {
  const start = performance.now();
  const url = `${API_BASE_URL}/jobs/${jobId}`;
  try {
    const response = await fetchWithTimeout(url);
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Job with ID ${jobId} not found (404).`);
        return null;
      }
      const errorBody = await response.text();
      console.error(`Error fetching job by ID ${jobId}: ${response.status} ${response.statusText}`, errorBody);
      throw new Error(`Error fetching job by ID ${jobId}: ${response.status} ${response.statusText}`);
    }
    const jobData: ApiJob = await response.json();
    console.log(`fetchJobById took ${performance.now() - start}ms`);
    return jobData;
  } catch (error: unknown) {
    console.log(`fetchJobById failed after ${performance.now() - start}ms`);
    if (error instanceof Error) {
      console.error(`Failed to fetch job by ID ${jobId}:`, error.message);
    } else {
      console.error(`An unknown error occurred while fetching job ID ${jobId}:`, error);
    }
    return null;
  }
};