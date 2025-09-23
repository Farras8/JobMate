// src/services/preferenceService.ts
import { auth } from '../services/firebase'; // Your Firebase auth instance
import { FieldValue } from "firebase/firestore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const validJobTypes = ["Full-Time","Part-Time","Contract","Internship","Remote"] as const;
export type JobType = typeof validJobTypes[number];

export interface PreferenceData {
  id?: 'default';
  jobCategories: string[];
  locations: string[];
  salaryExpectation: number | null;
  jobTypes: JobType[];
  createdAt?: Date | FieldValue | string;
  updatedAt?: Date | FieldValue | string;
}

// Helper function to get the ID token
const getIdToken = async (): Promise<string | null> => {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken();
  }
  return null;
};

// Add or Set user preferences
export const setPreferences = async (preferenceData: Omit<PreferenceData, 'id' | 'createdAt' | 'updatedAt'>): Promise<PreferenceData> => {
  // Development mode protection - return mock data if API is not available
  const isDevelopment = import.meta.env.VITE_DEVELOPMENT_MODE === 'true';
  if (isDevelopment) {
    console.warn('Development mode: Returning mock preferences data');
    return {
      id: 'default',
      ...preferenceData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  const token = await getIdToken();
  if (!token) {
    throw new Error('User not authenticated');
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${API_BASE_URL}/preferences`, {
      method: 'POST', // The backend uses POST to set/create
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(preferenceData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to set preferences and parse error' }));
      console.error('Set preferences error:', response.status, errorData);
      throw new Error(errorData.error || `Failed to set preferences. Status: ${response.status}`);
    }
    const result = await response.json();
    return result.preferences as PreferenceData; 
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error('Set preferences timeout');
      throw new Error('Set preferences timed out');
    }
    
    // Check for CORS or network errors
    if (error.message?.includes('CORS') || error.message?.includes('fetch')) {
      console.warn('CORS or network error when setting preferences');
      throw new Error('Network error when setting preferences. Please try again.');
    }
    
    throw error;
  }
};

// Get user preferences
export const getPreferences = async (): Promise<{id: string, preferences: PreferenceData} | null> => {
  // Development mode protection - return null (no preferences) if API is not available
  const isDevelopment = import.meta.env.VITE_DEVELOPMENT_MODE === 'true';
  if (isDevelopment) {
    console.warn('Development mode: Returning null for preferences (no preferences set)');
    return null;
  }

  const token = await getIdToken();
  if (!token) {
    throw new Error('User not authenticated');
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${API_BASE_URL}/preferences`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.status === 404) {
      console.info('Preferences not found (404) - user has not set preferences yet');
      return null; // Preferences not found, which is a valid state
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to get preferences and parse error' }));
      console.error('Get preferences error:', response.status, errorData);
      
      // For other HTTP errors, return null instead of throwing to prevent crashes
      console.warn(`Preferences API returned ${response.status}, treating as no preferences set`);
      return null;
    }
    
    return response.json();
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error('Preferences fetch timeout');
      return null; // Return null instead of throwing
    }
    
    // Check for CORS or network errors
    if (error.message?.includes('CORS') || error.message?.includes('fetch')) {
      console.warn('CORS or network error when fetching preferences, returning null');
      return null;
    }
    
    // For any other errors, return null to prevent crashes
    console.warn('Unexpected error fetching preferences:', error.message);
    return null;
  }
};

// Update user preferences
export const updatePreferences = async (preferenceData: Partial<Omit<PreferenceData, 'id' | 'createdAt' | 'updatedAt'>>): Promise<{ message: string }> => {
  const token = await getIdToken();
  if (!token) {
    throw new Error('User not authenticated');
  }
  
  const response = await fetch(`${API_BASE_URL}/preferences`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(preferenceData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to update preferences and parse error' }));
    console.error('Update preferences error:', response.status, errorData);
    throw new Error(errorData.error || `Failed to update preferences. Status: ${response.status}`);
  }
  return response.json();
};

// You might need a master list of job categories and locations.
// Similar to skills, these should ideally come from backend endpoints.

export const fetchMasterJobCategories = async (): Promise<string[]> => {
    // Placeholder implementation
    console.warn("fetchMasterJobCategories: Using placeholder data.");
    return Promise.resolve(["Teknologi Informasi", "Pemasaran", "Keuangan", "Desain Grafis", "Sumber Daya Manusia", "Penjualan"]);
};

export const fetchMasterLocations = async (): Promise<string[]> => {
    // Placeholder implementation
    console.warn("fetchMasterLocations: Using placeholder data.");
    return Promise.resolve(["Jakarta", "Bandung", "Surabaya", "Yogyakarta", "Bali", "Medan", "Makassar", "Remote"]);
};
