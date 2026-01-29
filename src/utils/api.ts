// API Base URL
// API Base URL
// Use VITE_API_URL if configured (e.g. for sharing via ngrok), otherwise fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || '/api';

// Get auth token from localStorage
const getToken = (): string | null => {
    return localStorage.getItem('authToken');
};

// Set auth token in localStorage
const setToken = (token: string): void => {
    localStorage.setItem('authToken', token);
};

// Remove auth token from localStorage
const removeToken = (): void => {
    localStorage.removeItem('authToken');
};

// Make authenticated API request
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
    const token = getToken();

    const headers: { [key: string]: string } = {
        'Content-Type': 'application/json',
        // Bypass ngrok browser warning for API requests
        'ngrok-skip-browser-warning': 'true',
        ...(options.headers as any || {}),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Request failed');
    }

    return data;
};

// Auth API functions
export const authAPI = {
    // Signup
    signup: async (userData: {
        name: string;
        email: string;
        password: string;
        phone?: string;
        age?: number;
        emergencyContact?: string;
    }) => {
        const data = await apiRequest('/auth/signup', {
            method: 'POST',
            body: JSON.stringify(userData),
        });

        if (data.token) {
            setToken(data.token);
        }

        return data;
    },

    // Login
    login: async (credentials: { email: string; password: string }) => {
        const data = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });

        if (data.token) {
            setToken(data.token);
        }

        return data;
    },

    // Get current user
    getCurrentUser: async () => {
        return await apiRequest('/auth/me');
    },

    // Logout
    logout: async () => {
        removeToken();
        localStorage.removeItem('customer');
        return await apiRequest('/auth/logout', {
            method: 'POST',
        });
    },
};

// Trips API
export const tripsAPI = {
    create: async (tripData: any) => {
        return await apiRequest('/trips', {
            method: 'POST',
            body: JSON.stringify(tripData),
        });
    },

    getAll: async () => {
        return await apiRequest('/trips');
    },

    getById: async (id: string) => {
        return await apiRequest(`/trips/${id}`);
    },

    update: async (id: string, tripData: any) => {
        return await apiRequest(`/trips/${id}`, {
            method: 'PUT',
            body: JSON.stringify(tripData),
        });
    },
};

// Transport Bookings API
export const transportBookingsAPI = {
    create: async (bookingData: any) => {
        return await apiRequest('/transport-bookings', {
            method: 'POST',
            body: JSON.stringify(bookingData),
        });
    },

    getAll: async () => {
        return await apiRequest('/transport-bookings');
    },

    getById: async (id: string) => {
        return await apiRequest(`/transport-bookings/${id}`);
    },

    getByTripId: async (tripId: string) => {
        return await apiRequest(`/transport-bookings/trip/${tripId}`);
    },
};

// Accommodation Bookings API
export const accommodationBookingsAPI = {
    create: async (bookingData: any) => {
        return await apiRequest('/accommodation-bookings', {
            method: 'POST',
            body: JSON.stringify(bookingData),
        });
    },

    getAll: async () => {
        return await apiRequest('/accommodation-bookings');
    },

    getById: async (id: string) => {
        return await apiRequest(`/accommodation-bookings/${id}`);
    },

    getByTripId: async (tripId: string) => {
        return await apiRequest(`/accommodation-bookings/trip/${tripId}`);
    },
};

// Payments API
export const paymentsAPI = {
    create: async (paymentData: any) => {
        return await apiRequest('/payments', {
            method: 'POST',
            body: JSON.stringify(paymentData),
        });
    },

    getAll: async () => {
        return await apiRequest('/payments');
    },

    getById: async (id: string) => {
        return await apiRequest(`/payments/${id}`);
    },

    getByTripId: async (tripId: string) => {
        return await apiRequest(`/payments/trip/${tripId}`);
    },
};

export { getToken, setToken, removeToken };
