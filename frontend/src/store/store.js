import { create } from 'zustand';
import { customerService, tripService, transportBookingService, accommodationBookingService, paymentService } from '../services/apiServices.js';

export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('authToken') || null,
  isLoading: false,
  error: null,

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await customerService.register(userData);
      set({ user: response, isLoading: false });
      return response;
    } catch (error) {
      set({ error: error.error || 'Registration failed', isLoading: false });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await customerService.login(email, password);
      set({ user: response.user, token: response.token, isLoading: false });
      return response;
    } catch (error) {
      set({ error: error.error || 'Login failed', isLoading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    set({ user: null, token: null });
  },

  clearError: () => set({ error: null }),
}));

export const useTripStore = create((set, get) => ({
  trips: [],
  currentTrip: null,
  isLoading: false,
  error: null,

  fetchCustomerTrips: async (customerId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await tripService.getCustomerTrips(customerId);
      set({ trips: response, isLoading: false });
      return response;
    } catch (error) {
      set({ error: error.error || 'Failed to fetch trips', isLoading: false });
      throw error;
    }
  },

  createTrip: async (tripData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await tripService.createTrip(tripData);
      set((state) => ({
        trips: [...state.trips, response],
        isLoading: false,
      }));
      return response;
    } catch (error) {
      set({ error: error.error || 'Failed to create trip', isLoading: false });
      throw error;
    }
  },

  updateTrip: async (tripId, tripData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await tripService.updateTrip(tripId, tripData);
      set((state) => ({
        trips: state.trips.map((t) => (t._id === tripId ? response : t)),
        currentTrip: response,
        isLoading: false,
      }));
      return response;
    } catch (error) {
      set({ error: error.error || 'Failed to update trip', isLoading: false });
      throw error;
    }
  },

  deleteTrip: async (tripId) => {
    set({ isLoading: true, error: null });
    try {
      await tripService.deleteTrip(tripId);
      set((state) => ({
        trips: state.trips.filter((t) => t._id !== tripId),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.error || 'Failed to delete trip', isLoading: false });
      throw error;
    }
  },

  setCurrentTrip: (trip) => set({ currentTrip: trip }),
  clearError: () => set({ error: null }),
}));

export const useBookingStore = create((set, get) => ({
  transportBookings: [],
  accommodationBookings: [],
  isLoading: false,
  error: null,

  fetchTripTransportBookings: async (tripId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await transportBookingService.getTripBookings(tripId);
      set({ transportBookings: response, isLoading: false });
      return response;
    } catch (error) {
      set({ error: error.error || 'Failed to fetch bookings', isLoading: false });
      throw error;
    }
  },

  fetchTripAccommodationBookings: async (tripId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await accommodationBookingService.getTripBookings(tripId);
      set({ accommodationBookings: response, isLoading: false });
      return response;
    } catch (error) {
      set({ error: error.error || 'Failed to fetch bookings', isLoading: false });
      throw error;
    }
  },

  createTransportBooking: async (bookingData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await transportBookingService.createBooking(bookingData);
      set((state) => ({
        transportBookings: [...state.transportBookings, response],
        isLoading: false,
      }));
      return response;
    } catch (error) {
      set({ error: error.error || 'Failed to create booking', isLoading: false });
      throw error;
    }
  },

  createAccommodationBooking: async (bookingData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await accommodationBookingService.createBooking(bookingData);
      set((state) => ({
        accommodationBookings: [...state.accommodationBookings, response],
        isLoading: false,
      }));
      return response;
    } catch (error) {
      set({ error: error.error || 'Failed to create booking', isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));

export const usePaymentStore = create((set, get) => ({
  payments: [],
  isLoading: false,
  error: null,

  fetchTripPayments: async (tripId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await paymentService.getTripPayments(tripId);
      set({ payments: response, isLoading: false });
      return response;
    } catch (error) {
      set({ error: error.error || 'Failed to fetch payments', isLoading: false });
      throw error;
    }
  },

  createPayment: async (paymentData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await paymentService.createPayment(paymentData);
      set((state) => ({
        payments: [...state.payments, response],
        isLoading: false,
      }));
      return response;
    } catch (error) {
      set({ error: error.error || 'Failed to create payment', isLoading: false });
      throw error;
    }
  },

  updatePayment: async (paymentId, paymentData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await paymentService.updatePayment(paymentId, paymentData);
      set((state) => ({
        payments: state.payments.map((p) => (p._id === paymentId ? response : p)),
        isLoading: false,
      }));
      return response;
    } catch (error) {
      set({ error: error.error || 'Failed to update payment', isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
