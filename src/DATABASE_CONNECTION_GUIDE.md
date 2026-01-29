# ============================================
# SQL SERVER DATABASE CONNECTION GUIDE
# ============================================

## Step 1: SQL Server Setup (Already Created)

The file `database/sqlserver-setup.sql` contains the complete database schema.

### How to Execute:

1. **Open SQL Server Management Studio (SSMS)**
2. **Connect to your SQL Server instance**
3. **Click "File" → "Open" → "File"** or press Ctrl+O
4. **Navigate to:** `C:\Users\HP\Desktop\Travel_Co_Project\src\database\sqlserver-setup.sql`
5. **Click "Open"**
6. **Click "Execute"** or press F5

The script will:
- ✅ Create database `Travel_Co_DB`
- ✅ Create 5 tables with relationships
- ✅ Create 14 performance indexes
- ✅ Create 5 automatic update triggers
- ✅ Create 2 stored procedures
- ✅ Display verification results

---

## Step 2: Backend API Server

You need a backend API server to connect your React app to SQL Server.

### Quick Setup with Node.js/Express

Create `backend/server.js`:

\`\`\`javascript
const express = require('express');
const sql = require('mssql');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// SQL Server Configuration
const config = {
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_NAME || 'Travel_Co_DB',
  authentication: {
    type: 'default',
    options: {
      userName: process.env.DB_USER || 'sa',
      password: process.env.DB_PASSWORD || 'YourPassword123!'
    }
  },
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

// Connect to SQL Server
const pool = new sql.ConnectionPool(config);
pool.connect().then(() => {
  console.log('✅ Connected to SQL Server');
}).catch(err => {
  console.error('❌ Connection failed:', err);
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Create Customer
app.post('/api/customers', async (req, res) => {
  try {
    const { Name, Email, Phone, Age, EmergencyContact } = req.body;
    const request = pool.request();
    
    const result = await request
      .input('Name', sql.NVarChar, Name)
      .input('Email', sql.NVarChar, Email)
      .input('Phone', sql.NVarChar, Phone)
      .input('Age', sql.Int, Age)
      .input('EmergencyContact', sql.NVarChar, EmergencyContact)
      .query(\`INSERT INTO Customers (Name, Email, Phone, Age, EmergencyContact) 
               OUTPUT inserted.* VALUES (@Name, @Email, @Phone, @Age, @EmergencyContact)\`);
    
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Customer
app.get('/api/customers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const request = pool.request();
    
    const result = await request
      .input('CustomerID', sql.UniqueIdentifier, id)
      .query('SELECT * FROM Customers WHERE CustomerID = @CustomerID');
    
    res.json(result.recordset[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create Trip
app.post('/api/trips', async (req, res) => {
  try {
    const { CustomerID, StartState, DestinationDistrict, StartDate } = req.body;
    const request = pool.request();
    
    const result = await request
      .input('CustomerID', sql.UniqueIdentifier, CustomerID)
      .input('StartState', sql.NVarChar, StartState)
      .input('DestinationDistrict', sql.NVarChar, DestinationDistrict)
      .input('StartDate', sql.Date, StartDate)
      .query(\`INSERT INTO Trips (CustomerID, StartState, DestinationDistrict, StartDate, PaymentStatus)
               OUTPUT inserted.* VALUES (@CustomerID, @StartState, @DestinationDistrict, @StartDate, 'Pending')\`);
    
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Similar endpoints for transport bookings, accommodations, payments...

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(\`✅ Server running on port \${PORT}\`);
});
\`\`\`

---

## Step 3: Connection String Reference

### For React Frontend
See `.env.example` for environment variables.

### For .NET Backend
\`\`\`csharp
string connectionString = "Server=localhost;Database=Travel_Co_DB;User Id=sa;Password=YourPassword123!;";
\`\`\`

### For Node.js/Express
\`\`\`javascript
const config = {
  server: 'localhost',
  database: 'Travel_Co_DB',
  authentication: {
    type: 'default',
    options: {
      userName: 'sa',
      password: 'YourPassword123!'
    }
  }
};
\`\`\`

### For Python
\`\`\`python
import pyodbc

conn = pyodbc.connect(
    'Driver={ODBC Driver 17 for SQL Server};'
    'Server=localhost;'
    'Database=Travel_Co_DB;'
    'UID=sa;'
    'PWD=YourPassword123!;'
)
\`\`\`

---

## Step 4: Verify Database Setup

Open SQL Server Management Studio and run:

\`\`\`sql
-- Check tables
SELECT name FROM sys.tables WHERE type = 'U' ORDER BY name;

-- Should return:
-- AccommodationBookings
-- Customers
-- Payments
-- TransportBookings
-- Trips

-- Check if you can insert data
INSERT INTO Customers (Name, Email, Phone, Age, EmergencyContact)
VALUES ('Test User', 'test@example.com', '9876543210', 30, 'Test Contact');

-- Verify insert
SELECT * FROM Customers;
\`\`\`

---

## Step 5: Update Application Code

### Update your Login component to use SQL Server:

Replace Supabase calls with the new database service:

\`\`\`typescript
import { database } from '../services/database';

// Instead of: await supabase.auth.signUp()
// Use: await database.createCustomer()

const handleSignUp = async () => {
  try {
    const customer = await database.createCustomer({
      Name: formData.name,
      Email: formData.email,
      Phone: formData.phone,
      Age: parseInt(formData.age),
      EmergencyContact: formData.emergencyContact
    });
    
    localStorage.setItem('customer', JSON.stringify(customer));
    onLogin(customer);
  } catch (error) {
    setError('Signup failed: ' + error.message);
  }
};
\`\`\`

---

## Common Issues & Solutions

### ❌ "Cannot connect to database"
- Verify SQL Server is running
- Check firewall allows TCP:1433
- Verify username/password is correct

### ❌ "Database does not exist"
- Run the SQL setup script first
- Check you're using correct database name

### ❌ "Login failed for user 'sa'"
- Default SQL Server may not have SQL Auth enabled
- Enable Mixed Mode Authentication in SQL Server Configuration Manager

### ❌ "Transaction ID already exists"
- Unique constraint on payments.TransactionID
- Generate unique IDs before inserting

---

## Troubleshooting Queries

\`\`\`sql
-- Check all tables exist
SELECT name FROM sys.tables;

-- Check all indexes
SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('dbo.Customers');

-- Check all triggers
SELECT * FROM sys.triggers;

-- View table structure
EXEC sp_help 'Customers';

-- Check data
SELECT COUNT(*) FROM Customers;
SELECT COUNT(*) FROM Trips;
SELECT COUNT(*) FROM Payments;

-- Drop and recreate if needed
DROP TABLE Payments;
DROP TABLE TransportBookings;
DROP TABLE AccommodationBookings;
DROP TABLE Trips;
DROP TABLE Customers;

-- Re-run setup script
\`\`\`

---

## Next Steps

1. ✅ Execute SQL setup script in SSMS
2. ✅ Set up backend API server (Node.js/Express or .NET)
3. ✅ Create `.env` file with database credentials
4. ✅ Update React components to use `database` service
5. ✅ Test API connections
6. ✅ Run application

Your SQL Server database is now ready to use!
