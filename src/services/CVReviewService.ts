// src/services/CVReviewService.ts

const CV_REVIEW_API_URL = "https://cv-review-service-11168120376.asia-southeast2.run.app/review";

export interface CVReviewResponse {
  action_plan: ActionPlanItem[];
  issues: Issue[];
  keywords: KeywordAnalysis;
  line_by_line: LineByLineAnalysis[];
  overall_score: number;
  scores: Scores;
  skills: {
    hardSkills: string[];
    softSkills: string[];
  };
  strengths: Strength[];
}

export interface ActionPlanItem {
  week: number;
  focus: string;
  steps: string[];
}

export interface Issue {
  title: string;
  description: string;
  impact: 'Tinggi' | 'Sedang' | 'Rendah';
}

export interface KeywordAnalysis {
  well_used: string[];
  missing: string[];
  suggestions: string[];
}

export interface LineByLineAnalysis {
  section: string;
  needs_improvement: string;
}

export interface Scores {
  ats: number;
  content: number;
  format: number;
  impact: number;
}

export interface Strength {
  title: string;
  description: string;
}

export const reviewCV = async (cvFile: File): Promise<CVReviewResponse> => {
  try {
    const formData = new FormData();
    formData.append('user_cv', cvFile);
    
    const response = await fetch(CV_REVIEW_API_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error reviewing CV:', error);
    throw error;
  }
};

/**
 * Ekstrak skills dari CV yang diupload menggunakan hasil analisis CV
 */
export const extractSkillsFromCV = async (cvFile: File): Promise<string[]> => {
  try {
    const reviewResult = await reviewCV(cvFile);
    
    // Gabungkan well_used keywords sebagai skills yang terdeteksi
    const detectedSkills = reviewResult.keywords?.well_used || [];
    
    return detectedSkills;
  } catch (error) {
    console.error('Error extracting skills from CV:', error);
    throw error;
  }
};
