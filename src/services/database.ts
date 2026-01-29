// ============================================
// SQL SERVER DATABASE SERVICE
// Replaces Supabase with SQL Server Backend
// ============================================

import axios, { AxiosInstance } from 'axios';

interface DatabaseConfig {
  baseUrl: string;
  timeout?: number;
}

interface Customer {
  CustomerID: string;
  Name: string;
  Email: string;
  Phone?: string;
  Age?: number;
  EmergencyContact?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
}

interface Trip {
  TripID: number;
  CustomerID: string;
  StartState: string;
  DestinationDistrict: string;
  StartDate: string;
  MaxDailyHours?: number;
  RestFrequency?: number;
  WheelchairAccessible?: boolean;
  NearbyHospitals?: boolean;
  NearbyPharmacies?: boolean;
  PaymentStatus: string;
  CreatedAt?: string;
  UpdatedAt?: string;
}

interface TransportBooking {
  BookingID: number;
  TripID: number;
  CustomerID: string;
  TransportType: string;
  TransportName: string;
  Vendor?: string;
  Price: number;
  Duration?: string;
  SafetyScore?: number;
  BookingStatus?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
}

interface AccommodationBooking {
  BookingID: number;
  TripID: number;
  CustomerID: string;
  HotelName: string;
  RoomType?: string;
  PricePerNight: number;
  Nights: number;
  TotalPrice: number;
  CheckInDate?: string;
  CheckOutDate?: string;
  BookingStatus?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
}

interface Payment {
  PaymentID: number;
  TripID: number;
  CustomerID: string;
  Amount: number;
  PaymentMethod?: string;
  TransactionID: string;
  Status: string;
  PaidAt?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
}

class SQLServerDatabase {
  private api: AxiosInstance;

  constructor(config: DatabaseConfig) {
    this.api = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // ============================================
  // CUSTOMER OPERATIONS
  // ============================================

  async createCustomer(customer: Omit<Customer, 'CustomerID' | 'CreatedAt' | 'UpdatedAt'>) {
    try {
      const response = await this.api.post('/customers', customer);
      return response.data;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  }

  async getCustomer(customerId: string) {
    try {
      const response = await this.api.get(`/customers/${customerId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  }

  async updateCustomer(customerId: string, updates: Partial<Customer>) {
    try {
      const response = await this.api.put(`/customers/${customerId}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  }

  async getCustomerByEmail(email: string) {
    try {
      const response = await this.api.get(`/customers/email/${email}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customer by email:', error);
      throw error;
    }
  }

  // ============================================
  // TRIP OPERATIONS
  // ============================================

  async createTrip(trip: Omit<Trip, 'TripID' | 'CreatedAt' | 'UpdatedAt'>) {
    try {
      const response = await this.api.post('/trips', trip);
      return response.data;
    } catch (error) {
      console.error('Error creating trip:', error);
      throw error;
    }
  }

  async getTrip(tripId: number) {
    try {
      const response = await this.api.get(`/trips/${tripId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching trip:', error);
      throw error;
    }
  }

  async getCustomerTrips(customerId: string) {
    try {
      const response = await this.api.get(`/trips/customer/${customerId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customer trips:', error);
      throw error;
    }
  }

  async updateTrip(tripId: number, updates: Partial<Trip>) {
    try {
      const response = await this.api.put(`/trips/${tripId}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating trip:', error);
      throw error;
    }
  }

  async getTripSummary(tripId: number) {
    try {
      const response = await this.api.get(`/trips/${tripId}/summary`);
      return response.data;
    } catch (error) {
      console.error('Error fetching trip summary:', error);
      throw error;
    }
  }

  // ============================================
  // TRANSPORT BOOKING OPERATIONS
  // ============================================

  async createTransportBooking(booking: Omit<TransportBooking, 'BookingID' | 'CreatedAt' | 'UpdatedAt'>) {
    try {
      const response = await this.api.post('/transport-bookings', booking);
      return response.data;
    } catch (error) {
      console.error('Error creating transport booking:', error);
      throw error;
    }
  }

  async getTransportBooking(bookingId: number) {
    try {
      const response = await this.api.get(`/transport-bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching transport booking:', error);
      throw error;
    }
  }

  async getTripTransportBookings(tripId: number) {
    try {
      const response = await this.api.get(`/transport-bookings/trip/${tripId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching trip transport bookings:', error);
      throw error;
    }
  }

  async updateTransportBooking(bookingId: number, updates: Partial<TransportBooking>) {
    try {
      const response = await this.api.put(`/transport-bookings/${bookingId}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating transport booking:', error);
      throw error;
    }
  }

  // ============================================
  // ACCOMMODATION BOOKING OPERATIONS
  // ============================================

  async createAccommodationBooking(booking: Omit<AccommodationBooking, 'BookingID' | 'CreatedAt' | 'UpdatedAt'>) {
    try {
      const response = await this.api.post('/accommodation-bookings', booking);
      return response.data;
    } catch (error) {
      console.error('Error creating accommodation booking:', error);
      throw error;
    }
  }

  async getAccommodationBooking(bookingId: number) {
    try {
      const response = await this.api.get(`/accommodation-bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching accommodation booking:', error);
      throw error;
    }
  }

  async getTripAccommodationBookings(tripId: number) {
    try {
      const response = await this.api.get(`/accommodation-bookings/trip/${tripId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching trip accommodation bookings:', error);
      throw error;
    }
  }

  async updateAccommodationBooking(bookingId: number, updates: Partial<AccommodationBooking>) {
    try {
      const response = await this.api.put(`/accommodation-bookings/${bookingId}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating accommodation booking:', error);
      throw error;
    }
  }

  // ============================================
  // PAYMENT OPERATIONS
  // ============================================

  async createPayment(payment: Omit<Payment, 'PaymentID' | 'CreatedAt' | 'UpdatedAt'>) {
    try {
      const response = await this.api.post('/payments', payment);
      return response.data;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  }

  async getPayment(paymentId: number) {
    try {
      const response = await this.api.get(`/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching payment:', error);
      throw error;
    }
  }

  async getTripPayments(tripId: number) {
    try {
      const response = await this.api.get(`/payments/trip/${tripId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching trip payments:', error);
      throw error;
    }
  }

  async updatePayment(paymentId: number, updates: Partial<Payment>) {
    try {
      const response = await this.api.put(`/payments/${paymentId}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating payment:', error);
      throw error;
    }
  }

  async getPaymentByTransactionId(transactionId: string) {
    try {
      const response = await this.api.get(`/payments/transaction/${transactionId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching payment by transaction ID:', error);
      throw error;
    }
  }

  // ============================================
  // UTILITY METHODS
  // ============================================

  async getCustomerFullData(customerId: string) {
    try {
      const response = await this.api.get(`/customers/${customerId}/full-data`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customer full data:', error);
      throw error;
    }
  }

  async healthCheck() {
    try {
      const response = await this.api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Database health check failed:', error);
      throw error;
    }
  }
}

// Initialize and export database instance
const dbConfig: DatabaseConfig = {
  baseUrl: import.meta.env.VITE_DB_API_URL || 'http://localhost:3001/api',
  timeout: 15000,
};

export const database = new SQLServerDatabase(dbConfig);
export default database;
