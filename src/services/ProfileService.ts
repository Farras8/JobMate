import { auth } from '../services/firebase'; // Your Firebase auth instance

const API_BASE_URL = 'https://jobmate-rest-api-819767094904.asia-southeast2.run.app';

interface ProfileData {
  uid?: string;
  fullName?: string;
  phoneNumber?: string;
  city?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  portfolioSite?: string;
  username?: string;
  status?: string;
  photoUrl?: string | null;
}

// Helper function to get the ID token
const getIdToken = async (): Promise<string | null> => {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken();
  }
  return null;
};

// Fetch user profile
export const fetchProfile = async (): Promise<ProfileData> => {
  const token = await getIdToken();
  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to fetch profile and parse error' }));
    console.error('Fetch profile error:', response.status, errorData);
    throw new Error(errorData.error || `Failed to fetch profile. Status: ${response.status}`);
  }
  return response.json();
};

// Update user profile
export const updateProfile = async (profileData: Partial<ProfileData>, file?: File): Promise<ProfileData> => {
  const token = await getIdToken();
  if (!token) {
    throw new Error('User not authenticated');
  }

  // Create FormData for sending profile data and optional file
  const formData = new FormData();
  // Append profile fields (excluding undefined values)
  for (const key in profileData) {
    if (Object.prototype.hasOwnProperty.call(profileData, key)) {
      const typedKey = key as keyof ProfileData;
      if (profileData[typedKey] !== undefined && typedKey !== 'photoUrl') {
        formData.append(key, profileData[typedKey] as string);
      }
    }
  }
  // Append file if provided
  if (file) {
    formData.append('photo', file);
  }

  if (formData.entries().next().done && !file) {
    console.warn('No data provided to update profile.');
    return { message: 'No data provided to update.' } as any;
  }

  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      // Do not set Content-Type; browser sets it automatically for FormData
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to update profile and parse error' }));
    console.error('Update profile error:', response.status, errorData);
    throw new Error(errorData.error || `Failed to update profile. Status: ${response.status}`);
  }
  return response.json();
};

// Delete profile photo
export const deleteProfilePhoto = async (): Promise<any> => {
  const token = await getIdToken();
  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${API_BASE_URL}/profile/photo`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to delete photo and parse error' }));
    console.error('Delete photo error:', response.status, errorData);
    throw new Error(errorData.error || `Failed to delete profile photo. Status: ${response.status}`);
  }
  return response.json();
};