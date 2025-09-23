import { auth } from '../services/firebase'; // Firebase auth instance
import { FieldValue } from "firebase/firestore"; // Firestore type

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface DocumentData {
  id?: string;
  documentName: string;
  type: 'cv' | 'sertifikat';
  fileUrl: string;
  uploadedAt?: Date | FieldValue | string;
  updatedAt?: Date | FieldValue | string;
  credentialId?: string; // Optional for sertifikat
  issuedDate?: string;   // Required for sertifikat
  expireDate?: string;   // Optional for sertifikat
}

export const documentTypes: ReadonlyArray<DocumentData['type']> = ['cv', 'sertifikat'];

// Token cache
let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

const getIdToken = async (): Promise<string | null> => {
  const now = Date.now();
  if (cachedToken && tokenExpiry && now < tokenExpiry) {
    return cachedToken;
  }
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    cachedToken = token;
    tokenExpiry = now + 5 * 60 * 1000; // cache 5 menit
    return token;
  }
  return null;
};

// Fetch with timeout
const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeoutMs = 15000
) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);
    return response;
  } catch (error) {
    clearTimeout(timer);
    throw error;
  }
};

// Universal error handler
const parseErrorResponse = async (response: Response) => {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { error: text || 'Unknown error' };
  }
};

// Add new document
export const addDocument = async (
  documentName: string,
  type: DocumentData['type'],
  file: File,
  issuedDate?: string,
  credentialId?: string,
  expireDate?: string
): Promise<{ documentId: string; fileUrl: string; documentName: string; type: string; issuedDate?: string; credentialId?: string; expireDate?: string }> => {
  const token = await getIdToken();
  if (!token) throw new Error('User not authenticated');

  const formData = new FormData();
  formData.append('documentName', documentName);
  formData.append('type', type);
  formData.append('document', file);
  if (type === 'sertifikat') {
    if (!issuedDate) throw new Error('issuedDate is required for sertifikat');
    formData.append('issuedDate', issuedDate);
    if (credentialId) formData.append('credentialId', credentialId);
    if (expireDate) formData.append('expireDate', expireDate);
  }

  const response = await fetchWithTimeout(`${API_BASE_URL}/upload-document`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await parseErrorResponse(response);
    console.error('Add document error:', response.status, errorData);
    throw new Error(errorData.error || `Failed to upload document. Status: ${response.status}`);
  }

  const result = await response.json();
  return result.document;
};

// Get all documents
export const getDocuments = async (): Promise<DocumentData[]> => {
  const token = await getIdToken();
  if (!token) throw new Error('User not authenticated');

  const response = await fetchWithTimeout(`${API_BASE_URL}/upload-document`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await parseErrorResponse(response);
    console.error('Get documents error:', response.status, errorData);
    throw new Error(errorData.error || `Failed to get documents. Status: ${response.status}`);
  }

  const result = await response.json();
  return result.documents as DocumentData[];
};

// Update existing document
export const updateDocument = async (
  documentId: string,
  documentName?: string,
  type?: DocumentData['type'],
  file?: File,
  issuedDate?: string,
  credentialId?: string,
  expireDate?: string
): Promise<{ documentId: string; fileUrl?: string; documentName?: string; type?: string; issuedDate?: string; credentialId?: string; expireDate?: string }> => {
  const token = await getIdToken();
  if (!token) throw new Error('User not authenticated');
  if (!documentId) throw new Error('Document ID is required for update.');

  const formData = new FormData();
  if (documentName) formData.append('documentName', documentName);
  if (type) formData.append('type', type);
  if (file) formData.append('document', file);
  if (type === 'sertifikat') {
    if (issuedDate !== undefined) formData.append('issuedDate', issuedDate);
    if (credentialId !== undefined) formData.append('credentialId', credentialId);
    if (expireDate !== undefined) formData.append('expireDate', expireDate);
  } else if (type === 'cv') {
    // Ensure certificate-specific fields are not sent for cv type
    formData.append('issuedDate', '');
    formData.append('credentialId', '');
    formData.append('expireDate', '');
  }

  if ([...formData.entries()].length === 0) {
    throw new Error("No fields provided for update.");
  }

  const response = await fetchWithTimeout(`${API_BASE_URL}/upload-document/${documentId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await parseErrorResponse(response);
    console.error('Update document error:', response.status, errorData);
    throw new Error(errorData.error || `Failed to update document. Status: ${response.status}`);
  }

  const result = await response.json();
  return result.updatedFields;
};

// Delete document
export const deleteDocument = async (
  documentId: string
): Promise<{ message: string }> => {
  const token = await getIdToken();
  if (!token) throw new Error('User not authenticated');
  if (!documentId) throw new Error('Document ID is required for deletion.');

  const response = await fetchWithTimeout(`${API_BASE_URL}/upload-document/${documentId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await parseErrorResponse(response);
    console.error('Delete document error:', response.status, errorData);
    throw new Error(errorData.error || `Failed to delete document. Status: ${response.status}`);
  }

  return response.json();
};