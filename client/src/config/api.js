const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    ME: `${API_BASE_URL}/auth/me`,
  },
  EXERCISES: {
    ADD: `${API_BASE_URL}/api/exercises/add`,
    MY: `${API_BASE_URL}/api/exercises/my`,
    DELETE: (sessionId) => `${API_BASE_URL}/api/exercises/${sessionId}`,
  },
};

export default API_BASE_URL; 