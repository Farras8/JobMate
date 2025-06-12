// src/services/recommendationService.ts
import { auth, db } from './firebase';
import { collection, getDocs, query, where, orderBy, Timestamp, type DocumentData } from 'firebase/firestore';
import { type JobData, type UserSkill } from '../types';

// --- Helper Functions for Cosine Similarity (Dibiarkan jika masih dipakai di bagian lain) ---

function dotProduct(vecA: number[], vecB: number[]): number {
    return vecA.reduce((sum, val, i) => sum + val * (vecB[i] || 0), 0);
}

function magnitude(vec: number[]): number {
    return Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0));
}

export function cosineSimilarity(vecA: number[], vecB: number[]): number {
    const magA = magnitude(vecA);
    const magB = magnitude(vecB);
    if (magA === 0 || magB === 0) return 0;
    return dotProduct(vecA, vecB) / (magA * magB);
}

// --- Data Fetching Functions ---

// URL untuk API yang berhubungan dengan data user (misal: skill, profil)
const USER_API_BASE_URL = "https://jobseeker-capstone-705829099986.asia-southeast2.run.app";
// URL untuk API Model Machine Learning
const ML_API_BASE_URL = "https://jobmate-api-705829099986.asia-southeast2.run.app"; 

// !! PENTING: Untuk keamanan, token ini seharusnya disimpan di file .env.local
// Saya hardcode di sini sesuai permintaan Anda untuk contoh ini.
// Di file .env.local Anda, isinya: VITE_ML_API_TOKEN=mysecretbearer123
const ML_API_TOKEN = import.meta.env.VITE_ML_API_TOKEN || "mysecretbearer123";

const getIdToken = async (): Promise<string> => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");
    return await user.getIdToken();
};

export const fetchUserSkills = async (): Promise<{ hardSkills: UserSkill[], softSkills: UserSkill[] }> => {
    const token = await getIdToken();
    const headers = { Authorization: `Bearer ${token}` };

    const [resHard, resSoft] = await Promise.all([
        fetch(`${USER_API_BASE_URL}/hard-skills`, { headers }),
        fetch(`${USER_API_BASE_URL}/soft-skills`, { headers }),
    ]);

    if (!resHard.ok) throw new Error(`Gagal mengambil hard skills: ${resHard.statusText}`);
    if (!resSoft.ok) throw new Error(`Gagal mengambil soft skills: ${resSoft.statusText}`);

    const hardData = await resHard.json();
    const softData = await resSoft.json();

    const hardSkills = Array.isArray(hardData.skills) ? hardData.skills : (Array.isArray(hardData) ? hardData : []);
    const softSkills = Array.isArray(softData.skills) ? softData.skills : (Array.isArray(softData) ? softData : []);

    return { hardSkills, softSkills };
};

export const fetchAllJobsForMatching = async (): Promise<JobData[]> => {
    if (!auth.currentUser) {
        console.warn("Attempted to fetch all jobs without an authenticated user.");
        return [];
    }
    const jobsCollectionRef = collection(db, "jobs");
    const q = query(jobsCollectionRef, where("isActive", "==", true), orderBy("postedAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(docSnap => {
        const data = docSnap.data() as DocumentData;
        const postedAtTimestamp = data.postedAt as Timestamp;
        return {
            id: docSnap.id,
            jobTitle: data.jobTitle || "Judul Tidak Tersedia",
            companyName: data.companyName || "Perusahaan Tidak Diketahui",
            location: data.location || "Lokasi Tidak Diketahui",
            skillsRequired: (Array.isArray(data.skillsRequired) ? data.skillsRequired : []).map((s: any) => String(s).toLowerCase()),
            jobDescription: data.jobDescription || "Deskripsi tidak tersedia.",
            category: data.category,
            jobType: data.jobType,
            postedAt: postedAtTimestamp ? postedAtTimestamp.toDate() : undefined,
            salary: data.salary
        } as JobData;
    });
};

/**
 * FUNGSI BARU: Mengirim teks skill ke API ML dan mendapatkan rekomendasi.
 */
export const fetchRecommendationsFromAPI = async (skillsAsText: string): Promise<any[]> => {
    console.log("Mengirim teks ke API ML:", skillsAsText);
    
    const response = await fetch(`${ML_API_BASE_URL}/recommend`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // API Python Anda menggunakan token statis, bukan token Firebase
            'Authorization': `Bearer ${ML_API_TOKEN}` 
        },
        body: JSON.stringify({
            text: skillsAsText
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Response:", errorData);
        throw new Error(`Gagal mendapatkan rekomendasi dari API: ${errorData.detail || response.statusText}`);
    }

    const data = await response.json();
    return data.recommendations || []; 
};