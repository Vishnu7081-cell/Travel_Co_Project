import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import Routes
import customerRoutes from './routes/customers.js';
import tripRoutes from './routes/trips.js';
import transportBookingRoutes from './routes/transportBookings.js';
import accommodationBookingRoutes from './routes/accommodationBookings.js';
import paymentRoutes from './routes/payments.js';
import authRoutes from './routes/auth.js';

// Load environment variables
dotenv.config();

const app = express();

// ============================================
// MIDDLEWARE
// ============================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the frontend build
const buildPath = path.join(__dirname, '../build');
app.use(express.static(buildPath));

// ============================================
// DATABASE CONNECTION
// ============================================

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/new_TravelCo';

    await mongoose.connect(mongoUri);

    console.log('✅ MongoDB Connected Successfully');
    console.log(`📊 Database: new_TravelCo`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// ============================================
// ROUTES
// ============================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Travel Co Backend is running',
    timestamp: new Date().toISOString(),
    database: 'new_TravelCo'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/transport-bookings', transportBookingRoutes);
app.use('/api/accommodation-bookings', accommodationBookingRoutes);
app.use('/api/payments', paymentRoutes);

// Catch-all to serve index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// ============================================
// ERROR HANDLING
// ============================================

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// ============================================
// SERVER STARTUP
// ============================================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`\n🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📡 API Health Check: http://localhost:${PORT}/api/health\n`);
      console.log('✅ Available Endpoints:');
      console.log('   GET    /api/health');
      console.log('   POST   /api/customers (create)');
      console.log('   GET    /api/customers (list)');
      console.log('   GET    /api/trips (list)');
      console.log('   GET    /api/transport-bookings (list)');
      console.log('   GET    /api/accommodation-bookings (list)');
      console.log('   GET    /api/payments (list)\n');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
