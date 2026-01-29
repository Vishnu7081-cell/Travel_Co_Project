// ============================================
// SQL SERVER BACKEND API SERVER
// Node.js + Express + MSSQL
// Ready to run: node backend/server.js
// ============================================

const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ============================================
// SQL SERVER CONNECTION CONFIGURATION
// ============================================

const config = {
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_DATABASE || 'Travel_Co_DB',
  authentication: {
    type: 'default',
    options: {
      userName: process.env.DB_USER_ID || 'sa',
      password: process.env.DB_PASSWORD || 'YourPassword123!'
    }
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableKeepAlive: true
  }
};

// Connection pool
let pool = null;

async function initializeConnectionPool() {
  try {
    pool = new sql.ConnectionPool(config);
    await pool.connect();
    console.log('✅ Connected to SQL Server Successfully');
    return true;
  } catch (err) {
    console.error('❌ Connection Error:', err);
    return false;
  }
}

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// ============================================
// HEALTH CHECK
// ============================================

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Travel Co API Server is running',
    timestamp: new Date().toISOString()
  });
});

// ============================================
// CUSTOMER ENDPOINTS
// ============================================

// CREATE CUSTOMER
app.post('/api/customers', async (req, res) => {
  try {
    const { Name, Email, Phone, Age, EmergencyContact } = req.body;

    if (!Name || !Email) {
      return res.status(400).json({ error: 'Name and Email are required' });
    }

    const customerId = uuidv4();
    const request = pool.request();

    const result = await request
      .input('CustomerID', sql.UniqueIdentifier, customerId)
      .input('Name', sql.NVarChar, Name)
      .input('Email', sql.NVarChar, Email)
      .input('Phone', sql.NVarChar, Phone || null)
      .input('Age', sql.Int, Age || null)
      .input('EmergencyContact', sql.NVarChar, EmergencyContact || null)
      .query(`INSERT INTO [dbo].[Customers] 
              (CustomerID, Name, Email, Phone, Age, EmergencyContact)
              VALUES (@CustomerID, @Name, @Email, @Phone, @Age, @EmergencyContact);
              SELECT * FROM [dbo].[Customers] WHERE CustomerID = @CustomerID`);

    res.status(201).json({
      success: true,
      data: result.recordset[0]
    });
  } catch (err) {
    console.error('Error creating customer:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET CUSTOMER BY ID
app.get('/api/customers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const request = pool.request();

    const result = await request
      .input('CustomerID', sql.UniqueIdentifier, id)
      .query('SELECT * FROM [dbo].[Customers] WHERE CustomerID = @CustomerID');

    if (result.recordset.length === 0) {
      return res.status(404).json({ success: false, error: 'Customer not found' });
    }

    res.json({ success: true, data: result.recordset[0] });
  } catch (err) {
    console.error('Error fetching customer:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET CUSTOMER BY EMAIL
app.get('/api/customers/email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const request = pool.request();

    const result = await request
      .input('Email', sql.NVarChar, email)
      .query('SELECT * FROM [dbo].[Customers] WHERE Email = @Email');

    if (result.recordset.length === 0) {
      return res.status(404).json({ success: false, error: 'Customer not found' });
    }

    res.json({ success: true, data: result.recordset[0] });
  } catch (err) {
    console.error('Error fetching customer:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE CUSTOMER
app.put('/api/customers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Phone, Age, EmergencyContact } = req.body;
    const request = pool.request();

    const result = await request
      .input('CustomerID', sql.UniqueIdentifier, id)
      .input('Name', sql.NVarChar, Name)
      .input('Phone', sql.NVarChar, Phone)
      .input('Age', sql.Int, Age)
      .input('EmergencyContact', sql.NVarChar, EmergencyContact)
      .query(`UPDATE [dbo].[Customers] 
              SET Name = @Name, Phone = @Phone, Age = @Age, EmergencyContact = @EmergencyContact
              WHERE CustomerID = @CustomerID;
              SELECT * FROM [dbo].[Customers] WHERE CustomerID = @CustomerID`);

    if (result.recordset.length === 0) {
      return res.status(404).json({ success: false, error: 'Customer not found' });
    }

    res.json({ success: true, data: result.recordset[0] });
  } catch (err) {
    console.error('Error updating customer:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================
// TRIP ENDPOINTS
// ============================================

// CREATE TRIP
app.post('/api/trips', async (req, res) => {
  try {
    const { CustomerID, StartState, DestinationDistrict, StartDate, MaxDailyHours, RestFrequency } = req.body;

    const request = pool.request();

    const result = await request
      .input('CustomerID', sql.UniqueIdentifier, CustomerID)
      .input('StartState', sql.NVarChar, StartState)
      .input('DestinationDistrict', sql.NVarChar, DestinationDistrict)
      .input('StartDate', sql.Date, StartDate)
      .input('MaxDailyHours', sql.Int, MaxDailyHours || null)
      .input('RestFrequency', sql.Int, RestFrequency || null)
      .query(`INSERT INTO [dbo].[Trips] 
              (CustomerID, StartState, DestinationDistrict, StartDate, MaxDailyHours, RestFrequency, PaymentStatus)
              OUTPUT inserted.*
              VALUES (@CustomerID, @StartState, @DestinationDistrict, @StartDate, @MaxDailyHours, @RestFrequency, 'Pending')`);

    res.status(201).json({
      success: true,
      data: result.recordset[0]
    });
  } catch (err) {
    console.error('Error creating trip:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET TRIP BY ID
app.get('/api/trips/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const request = pool.request();

    const result = await request
      .input('TripID', sql.BigInt, id)
      .query('SELECT * FROM [dbo].[Trips] WHERE TripID = @TripID');

    if (result.recordset.length === 0) {
      return res.status(404).json({ success: false, error: 'Trip not found' });
    }

    res.json({ success: true, data: result.recordset[0] });
  } catch (err) {
    console.error('Error fetching trip:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET CUSTOMER TRIPS
app.get('/api/trips/customer/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    const request = pool.request();

    const result = await request
      .input('CustomerID', sql.UniqueIdentifier, customerId)
      .query('SELECT * FROM [dbo].[Trips] WHERE CustomerID = @CustomerID ORDER BY CreatedAt DESC');

    res.json({ success: true, data: result.recordset });
  } catch (err) {
    console.error('Error fetching trips:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE TRIP
app.put('/api/trips/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { PaymentStatus } = req.body;
    const request = pool.request();

    const result = await request
      .input('TripID', sql.BigInt, id)
      .input('PaymentStatus', sql.NVarChar, PaymentStatus)
      .query(`UPDATE [dbo].[Trips] 
              SET PaymentStatus = @PaymentStatus
              WHERE TripID = @TripID;
              SELECT * FROM [dbo].[Trips] WHERE TripID = @TripID`);

    if (result.recordset.length === 0) {
      return res.status(404).json({ success: false, error: 'Trip not found' });
    }

    res.json({ success: true, data: result.recordset[0] });
  } catch (err) {
    console.error('Error updating trip:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET TRIP SUMMARY (using stored procedure)
app.get('/api/trips/:id/summary', async (req, res) => {
  try {
    const { id } = req.params;
    const request = pool.request();

    const result = await request
      .input('TripID', sql.BigInt, id)
      .execute('SP_GetTripSummary');

    if (result.recordset.length === 0) {
      return res.status(404).json({ success: false, error: 'Trip not found' });
    }

    res.json({ success: true, data: result.recordset[0] });
  } catch (err) {
    console.error('Error fetching trip summary:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================
// TRANSPORT BOOKING ENDPOINTS
// ============================================

// CREATE TRANSPORT BOOKING
app.post('/api/transport-bookings', async (req, res) => {
  try {
    const { TripID, CustomerID, TransportType, TransportName, Vendor, Price, Duration, SafetyScore } = req.body;

    const request = pool.request();

    const result = await request
      .input('TripID', sql.BigInt, TripID)
      .input('CustomerID', sql.UniqueIdentifier, CustomerID)
      .input('TransportType', sql.NVarChar, TransportType)
      .input('TransportName', sql.NVarChar, TransportName)
      .input('Vendor', sql.NVarChar, Vendor || null)
      .input('Price', sql.Decimal(10, 2), Price)
      .input('Duration', sql.NVarChar, Duration || null)
      .input('SafetyScore', sql.Decimal(3, 2), SafetyScore || null)
      .query(`INSERT INTO [dbo].[TransportBookings] 
              (TripID, CustomerID, TransportType, TransportName, Vendor, Price, Duration, SafetyScore)
              OUTPUT inserted.*
              VALUES (@TripID, @CustomerID, @TransportType, @TransportName, @Vendor, @Price, @Duration, @SafetyScore)`);

    res.status(201).json({
      success: true,
      data: result.recordset[0]
    });
  } catch (err) {
    console.error('Error creating transport booking:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET TRIP TRANSPORT BOOKINGS
app.get('/api/transport-bookings/trip/:tripId', async (req, res) => {
  try {
    const { tripId } = req.params;
    const request = pool.request();

    const result = await request
      .input('TripID', sql.BigInt, tripId)
      .query('SELECT * FROM [dbo].[TransportBookings] WHERE TripID = @TripID');

    res.json({ success: true, data: result.recordset });
  } catch (err) {
    console.error('Error fetching transport bookings:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================
// ACCOMMODATION BOOKING ENDPOINTS
// ============================================

// CREATE ACCOMMODATION BOOKING
app.post('/api/accommodation-bookings', async (req, res) => {
  try {
    const { TripID, CustomerID, HotelName, RoomType, PricePerNight, Nights, TotalPrice } = req.body;

    const request = pool.request();

    const result = await request
      .input('TripID', sql.BigInt, TripID)
      .input('CustomerID', sql.UniqueIdentifier, CustomerID)
      .input('HotelName', sql.NVarChar, HotelName)
      .input('RoomType', sql.NVarChar, RoomType || null)
      .input('PricePerNight', sql.Decimal(10, 2), PricePerNight)
      .input('Nights', sql.Int, Nights)
      .input('TotalPrice', sql.Decimal(10, 2), TotalPrice)
      .query(`INSERT INTO [dbo].[AccommodationBookings] 
              (TripID, CustomerID, HotelName, RoomType, PricePerNight, Nights, TotalPrice)
              OUTPUT inserted.*
              VALUES (@TripID, @CustomerID, @HotelName, @RoomType, @PricePerNight, @Nights, @TotalPrice)`);

    res.status(201).json({
      success: true,
      data: result.recordset[0]
    });
  } catch (err) {
    console.error('Error creating accommodation booking:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET TRIP ACCOMMODATION BOOKINGS
app.get('/api/accommodation-bookings/trip/:tripId', async (req, res) => {
  try {
    const { tripId } = req.params;
    const request = pool.request();

    const result = await request
      .input('TripID', sql.BigInt, tripId)
      .query('SELECT * FROM [dbo].[AccommodationBookings] WHERE TripID = @TripID');

    res.json({ success: true, data: result.recordset });
  } catch (err) {
    console.error('Error fetching accommodation bookings:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================
// PAYMENT ENDPOINTS
// ============================================

// CREATE PAYMENT
app.post('/api/payments', async (req, res) => {
  try {
    const { TripID, CustomerID, Amount, PaymentMethod, TransactionID, Status } = req.body;

    if (!TransactionID) {
      return res.status(400).json({ error: 'TransactionID is required' });
    }

    const request = pool.request();

    const result = await request
      .input('TripID', sql.BigInt, TripID)
      .input('CustomerID', sql.UniqueIdentifier, CustomerID)
      .input('Amount', sql.Decimal(10, 2), Amount)
      .input('PaymentMethod', sql.NVarChar, PaymentMethod || null)
      .input('TransactionID', sql.NVarChar, TransactionID)
      .input('Status', sql.NVarChar, Status || 'pending')
      .query(`INSERT INTO [dbo].[Payments] 
              (TripID, CustomerID, Amount, PaymentMethod, TransactionID, Status)
              OUTPUT inserted.*
              VALUES (@TripID, @CustomerID, @Amount, @PaymentMethod, @TransactionID, @Status)`);

    res.status(201).json({
      success: true,
      data: result.recordset[0]
    });
  } catch (err) {
    console.error('Error creating payment:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET PAYMENT BY TRANSACTION ID
app.get('/api/payments/transaction/:transactionId', async (req, res) => {
  try {
    const { transactionId } = req.params;
    const request = pool.request();

    const result = await request
      .input('TransactionID', sql.NVarChar, transactionId)
      .query('SELECT * FROM [dbo].[Payments] WHERE TransactionID = @TransactionID');

    if (result.recordset.length === 0) {
      return res.status(404).json({ success: false, error: 'Payment not found' });
    }

    res.json({ success: true, data: result.recordset[0] });
  } catch (err) {
    console.error('Error fetching payment:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET TRIP PAYMENTS
app.get('/api/payments/trip/:tripId', async (req, res) => {
  try {
    const { tripId } = req.params;
    const request = pool.request();

    const result = await request
      .input('TripID', sql.BigInt, tripId)
      .query('SELECT * FROM [dbo].[Payments] WHERE TripID = @TripID');

    res.json({ success: true, data: result.recordset });
  } catch (err) {
    console.error('Error fetching payments:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE PAYMENT STATUS
app.put('/api/payments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Status } = req.body;
    const request = pool.request();

    const result = await request
      .input('PaymentID', sql.BigInt, id)
      .input('Status', sql.NVarChar, Status)
      .query(`UPDATE [dbo].[Payments] 
              SET Status = @Status, PaidAt = GETUTCDATE()
              WHERE PaymentID = @PaymentID;
              SELECT * FROM [dbo].[Payments] WHERE PaymentID = @PaymentID`);

    if (result.recordset.length === 0) {
      return res.status(404).json({ success: false, error: 'Payment not found' });
    }

    res.json({ success: true, data: result.recordset[0] });
  } catch (err) {
    console.error('Error updating payment:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================
// START SERVER
// ============================================

const PORT = process.env.PORT || 3001;

async function startServer() {
  const connected = await initializeConnectionPool();

  if (!connected) {
    console.error('❌ Failed to connect to database. Exiting.');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📊 API Base URL: http://localhost:${PORT}/api`);
    console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
    console.log('');
    console.log('Ready to receive requests!');
  });
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down...');
  if (pool) {
    await pool.close();
  }
  process.exit(0);
});

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
