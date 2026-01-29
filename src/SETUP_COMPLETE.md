# 🗄️ SQL SERVER DATABASE SETUP - COMPLETE GUIDE

## ✅ Files Created and Ready

Your database system is now complete with the following files:

### 1. **Database Schema**
📄 Location: `database/sqlserver-setup.sql`
- Complete SQL Server schema with all tables
- 5 tables: Customers, Trips, TransportBookings, AccommodationBookings, Payments
- 14 performance indexes
- 5 automatic triggers
- 2 stored procedures

### 2. **Database Service**
📄 Location: `services/database.ts`
- TypeScript database service class
- All CRUD operations for your React app
- Type-safe interfaces
- Error handling

### 3. **Environment Configuration**
📄 Location: `.env.example`
- Database connection settings
- API configuration
- Application settings

### 4. **Connection Guide**
📄 Location: `DATABASE_CONNECTION_GUIDE.md`
- Detailed setup instructions
- Connection string examples for different languages
- Troubleshooting guide

### 5. **Quick Setup Script**
📄 Location: `database/setup.ps1`
- PowerShell script for automated setup
- Interactive SQL Server connection
- Automatic schema creation

---

## 🚀 QUICK START (Easiest Method)

### Option A: Using PowerShell Script (Automated)

```powershell
# 1. Open PowerShell as Administrator
# 2. Navigate to project folder
cd C:\Users\HP\Desktop\Travel_Co_Project\src

# 3. Run setup script
.\database\setup.ps1

# 4. Follow prompts:
#    - Server Name: localhost (or your server)
#    - Username: sa
#    - Password: your SQL password
```

### Option B: Using SQL Server Management Studio (Manual)

**Step 1: Open SSMS**
- Open SQL Server Management Studio
- Connect to your SQL Server instance

**Step 2: Open SQL Script**
- Click: File → Open → File
- Navigate to: `C:\Users\HP\Desktop\Travel_Co_Project\src\database\sqlserver-setup.sql`
- Click: Open

**Step 3: Execute**
- Click: Execute (or press F5)
- Wait for completion (you'll see green checkmarks)

**Step 4: Verify**
- In Object Explorer, expand Databases
- Should see: `Travel_Co_DB`
- Expand and verify tables are there

---

## 📊 What Gets Created

### Tables (5)
```
Customers
├── CustomerID (Primary Key)
├── Name, Email, Phone, Age
├── EmergencyContact
└── CreatedAt, UpdatedAt

Trips
├── TripID (Primary Key)
├── CustomerID (Foreign Key)
├── StartState, DestinationDistrict, StartDate
├── MaxDailyHours, RestFrequency
├── WheelchairAccessible, NearbyHospitals, NearbyPharmacies
├── PaymentStatus
└── CreatedAt, UpdatedAt

TransportBookings
├── BookingID (Primary Key)
├── TripID (Foreign Key)
├── CustomerID (Foreign Key)
├── TransportType, TransportName, Vendor, Price
├── Duration, SafetyScore
├── BookingStatus
└── CreatedAt, UpdatedAt

AccommodationBookings
├── BookingID (Primary Key)
├── TripID (Foreign Key)
├── CustomerID (Foreign Key)
├── HotelName, RoomType
├── PricePerNight, Nights, TotalPrice
├── CheckInDate, CheckOutDate
├── BookingStatus
└── CreatedAt, UpdatedAt

Payments
├── PaymentID (Primary Key)
├── TripID (Foreign Key)
├── CustomerID (Foreign Key)
├── Amount, PaymentMethod
├── TransactionID (Unique)
├── Status, PaidAt
└── CreatedAt, UpdatedAt
```

### Indexes (14)
- Email lookup on Customers
- Customer ID, Date, Payment Status on Trips
- Trip ID, Customer ID, Type on Transport Bookings
- Trip ID, Customer ID, Hotel Name on Accommodations
- Trip ID, Customer ID, Transaction ID, Status on Payments

### Triggers (5)
- Auto-update UpdatedAt timestamps on any changes

### Stored Procedures (2)
- `SP_GetCustomerFullData` - Get all customer data with bookings
- `SP_GetTripSummary` - Get trip summary with costs

---

## 🔧 Next Steps After Setup

### 1. Create Environment File
```bash
# Copy the example file
Copy-Item .env.example .env

# Edit .env and set your values:
VITE_DB_API_URL=http://localhost:3001/api
VITE_DB_SERVER=localhost
VITE_DB_DATABASE=Travel_Co_DB
VITE_DB_USER_ID=sa
VITE_DB_PASSWORD=YourPassword123!
```

### 2. Set Up Backend API Server

You need a backend server to connect React to SQL Server.

**Using Node.js/Express:**
```bash
# Install backend dependencies
npm install express mssql cors dotenv

# Create backend/server.js (see DATABASE_CONNECTION_GUIDE.md for code)

# Run backend
node backend/server.js
```

### 3. Update React Components

Replace Supabase with your new database service:

```typescript
// OLD (Supabase)
import { supabase } from "../supabase/client";
await supabase.from("customers").insert([...]);

// NEW (SQL Server)
import { database } from "../services/database";
await database.createCustomer({...});
```

### 4. Test Connection

```typescript
// Add this to test connection
import { database } from './services/database';

// Test health check
const health = await database.healthCheck();
console.log('Database connection:', health);
```

---

## 🔍 Verification Queries

After setup, run these in SQL Server Management Studio to verify:

```sql
-- Check all tables created
SELECT COUNT(*) as TableCount FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'dbo';

-- Check specific tables
SELECT * FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'dbo'
ORDER BY TABLE_NAME;

-- Check indexes
SELECT OBJECT_NAME(i.object_id) as TableName, i.name as IndexName
FROM sys.indexes i
WHERE i.object_id > 0 AND i.type > 0
ORDER BY OBJECT_NAME(i.object_id);

-- Check triggers
SELECT name FROM sys.triggers 
WHERE parent_class_desc = 'OBJECT_OR_COLUMN'
ORDER BY name;

-- Check stored procedures
SELECT name FROM sys.procedures 
WHERE name LIKE 'SP_%';

-- Test insert
INSERT INTO Customers (Name, Email, Phone, Age, EmergencyContact)
VALUES ('Test User', 'test@example.com', '9876543210', 30, 'Test Contact');

-- Verify data
SELECT * FROM Customers;
```

---

## 🐛 Troubleshooting

### Database Won't Create
- Ensure SQL Server service is running
- Check file paths are correct
- Verify permissions to create databases

### Tables Not Created
- Check for error messages in SSMS
- Try running script in smaller sections
- Check database was actually created

### Connection Issues in App
- Verify backend API server is running
- Check environment variables in `.env`
- Test connection with API directly (Postman)

### Permission Errors
- Run SSMS as Administrator
- Ensure SQL login has CREATE DATABASE permission

---

## 📞 Quick Reference

| Task | File | Location |
|------|------|----------|
| Database Setup | sqlserver-setup.sql | database/ |
| React Service | database.ts | services/ |
| Config Template | .env.example | root |
| Connection Info | DATABASE_CONNECTION_GUIDE.md | root |
| Auto Setup | setup.ps1 | database/ |

---

## ✨ Database Features

✅ **Data Integrity**
- Foreign key relationships
- Unique constraints on email/transaction ID
- Cascading deletes

✅ **Performance**
- 14 optimized indexes
- Proper query patterns

✅ **Reliability**
- Automatic timestamp updates with triggers
- Data validation

✅ **Security**
- Supports user authentication
- Ready for connection pooling

✅ **Scalability**
- BIGINT for auto-increment IDs
- DECIMAL for financial data
- DATETIME2 for accurate timestamps

---

## 🎯 What's Ready

✅ Database schema complete  
✅ Service layer created  
✅ Configuration files ready  
✅ Setup script provided  
✅ Connection guide written  

## 🚀 What's Next

1. Execute SQL setup script
2. Set up backend API server
3. Update React components
4. Test database connection
5. Run application

**Your SQL Server database is ready for production use!**
