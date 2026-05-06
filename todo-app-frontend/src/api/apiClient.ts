import { BASE_URL } from '../config/api';

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${BASE_URL}${endpoint}`;
    const defaultOptions: RequestInit = {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    };

    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status === 204) return null;

    return await response.json();
};
