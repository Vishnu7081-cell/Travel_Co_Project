import axiosInstance from './api.js';

// ============================================
// CUSTOMER SERVICES
// ============================================

export const customerService = {
  // Register new customer
  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/customers', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Registration failed' };
    }
  },

  // Login customer (will need endpoint to be added to backend)
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/customers/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Login failed' };
    }
  },

  // Get all customers
  getAllCustomers: async () => {
    try {
      const response = await axiosInstance.get('/customers');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch customers' };
    }
  },

  // Get customer by ID
  getCustomerById: async (customerId) => {
    try {
      const response = await axiosInstance.get(`/customers/${customerId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch customer' };
    }
  },

  // Update customer
  updateCustomer: async (customerId, userData) => {
    try {
      const response = await axiosInstance.put(`/customers/${customerId}`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to update customer' };
    }
  },

  // Delete customer
  deleteCustomer: async (customerId) => {
    try {
      const response = await axiosInstance.delete(`/customers/${customerId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to delete customer' };
    }
  },
};

// ============================================
// TRIP SERVICES
// ============================================

export const tripService = {
  // Create trip
  createTrip: async (tripData) => {
    try {
      const response = await axiosInstance.post('/trips', tripData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to create trip' };
    }
  },

  // Get all trips
  getAllTrips: async () => {
    try {
      const response = await axiosInstance.get('/trips');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch trips' };
    }
  },

  // Get trips for customer
  getCustomerTrips: async (customerId) => {
    try {
      const response = await axiosInstance.get(`/trips/customer/${customerId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch customer trips' };
    }
  },

  // Get trip by ID
  getTripById: async (tripId) => {
    try {
      const response = await axiosInstance.get(`/trips/${tripId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch trip' };
    }
  },

  // Update trip
  updateTrip: async (tripId, tripData) => {
    try {
      const response = await axiosInstance.put(`/trips/${tripId}`, tripData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to update trip' };
    }
  },

  // Delete trip
  deleteTrip: async (tripId) => {
    try {
      const response = await axiosInstance.delete(`/trips/${tripId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to delete trip' };
    }
  },
};

// ============================================
// TRANSPORT BOOKING SERVICES
// ============================================

export const transportBookingService = {
  // Create transport booking
  createBooking: async (bookingData) => {
    try {
      const response = await axiosInstance.post('/transport-bookings', bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to create booking' };
    }
  },

  // Get all transport bookings
  getAllBookings: async () => {
    try {
      const response = await axiosInstance.get('/transport-bookings');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch bookings' };
    }
  },

  // Get bookings for trip
  getTripBookings: async (tripId) => {
    try {
      const response = await axiosInstance.get(`/transport-bookings/trip/${tripId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch trip bookings' };
    }
  },

  // Get booking by ID
  getBookingById: async (bookingId) => {
    try {
      const response = await axiosInstance.get(`/transport-bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch booking' };
    }
  },

  // Update booking
  updateBooking: async (bookingId, bookingData) => {
    try {
      const response = await axiosInstance.put(`/transport-bookings/${bookingId}`, bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to update booking' };
    }
  },

  // Delete booking
  deleteBooking: async (bookingId) => {
    try {
      const response = await axiosInstance.delete(`/transport-bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to delete booking' };
    }
  },
};

// ============================================
// ACCOMMODATION BOOKING SERVICES
// ============================================

export const accommodationBookingService = {
  // Create accommodation booking
  createBooking: async (bookingData) => {
    try {
      const response = await axiosInstance.post('/accommodation-bookings', bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to create booking' };
    }
  },

  // Get all accommodation bookings
  getAllBookings: async () => {
    try {
      const response = await axiosInstance.get('/accommodation-bookings');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch bookings' };
    }
  },

  // Get bookings for trip
  getTripBookings: async (tripId) => {
    try {
      const response = await axiosInstance.get(`/accommodation-bookings/trip/${tripId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch trip bookings' };
    }
  },

  // Get booking by ID
  getBookingById: async (bookingId) => {
    try {
      const response = await axiosInstance.get(`/accommodation-bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch booking' };
    }
  },

  // Update booking
  updateBooking: async (bookingId, bookingData) => {
    try {
      const response = await axiosInstance.put(`/accommodation-bookings/${bookingId}`, bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to update booking' };
    }
  },

  // Delete booking
  deleteBooking: async (bookingId) => {
    try {
      const response = await axiosInstance.delete(`/accommodation-bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to delete booking' };
    }
  },
};

// ============================================
// PAYMENT SERVICES
// ============================================

export const paymentService = {
  // Create payment
  createPayment: async (paymentData) => {
    try {
      const response = await axiosInstance.post('/payments', paymentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to create payment' };
    }
  },

  // Get all payments
  getAllPayments: async () => {
    try {
      const response = await axiosInstance.get('/payments');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch payments' };
    }
  },

  // Get payments for trip
  getTripPayments: async (tripId) => {
    try {
      const response = await axiosInstance.get(`/payments/trip/${tripId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch trip payments' };
    }
  },

  // Get payment by ID
  getPaymentById: async (paymentId) => {
    try {
      const response = await axiosInstance.get(`/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch payment' };
    }
  },

  // Get payment by transaction ID
  getPaymentByTransactionId: async (transactionId) => {
    try {
      const response = await axiosInstance.get(`/payments/transaction/${transactionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch payment' };
    }
  },

  // Update payment
  updatePayment: async (paymentId, paymentData) => {
    try {
      const response = await axiosInstance.put(`/payments/${paymentId}`, paymentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to update payment' };
    }
  },

  // Delete payment
  deletePayment: async (paymentId) => {
    try {
      const response = await axiosInstance.delete(`/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to delete payment' };
    }
  },
};
