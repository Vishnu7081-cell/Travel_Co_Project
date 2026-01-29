# 🎯 QUICK START CHECKLIST

## ✅ WHAT'S READY (Everything is prepared!)

### Database Files
- [x] SQL Server schema (`database/sqlserver-setup.sql`)
- [x] Database service (`services/database.ts`)
- [x] Backend API server (`backend/server.js`)
- [x] Environment config (`.env.example`)
- [x] Setup script (`database/setup.ps1`)

### Documentation
- [x] Complete setup guide (`SETUP_COMPLETE.md`)
- [x] Connection guide (`DATABASE_CONNECTION_GUIDE.md`)
- [x] This checklist (`QUICK_START.md`)

---

## 🚀 STEP 1: CREATE SQL SERVER DATABASE (5 minutes)

### Option A - Automatic (Recommended)
```powershell
# Run PowerShell as Administrator
cd C:\Users\HP\Desktop\Travel_Co_Project\src
.\database\setup.ps1

# Follow prompts for your SQL Server details
```

### Option B - Manual
1. Open **SQL Server Management Studio**
2. **File → Open → File**
3. Navigate to: `C:\Users\HP\Desktop\Travel_Co_Project\src\database\sqlserver-setup.sql`
4. Click **Execute** (F5)
5. Wait for green checkmarks ✅

---

## 📋 STEP 2: CONFIGURE ENVIRONMENT (2 minutes)

```bash
# Copy example configuration
Copy-Item .env.example .env

# Edit .env file and set:
VITE_DB_API_URL=http://localhost:3001/api
VITE_DB_SERVER=localhost
VITE_DB_DATABASE=Travel_Co_DB
VITE_DB_USER_ID=sa
VITE_DB_PASSWORD=your_password_here
```

---

## 🔧 STEP 3: SET UP BACKEND SERVER (3 minutes)

```bash
# Install Node dependencies
cd C:\Users\HP\Desktop\Travel_Co_Project\src
npm install express mssql cors dotenv uuid

# Create .env in backend folder if needed
# Then run the server
node backend/server.js

# You should see:
# ✅ Connected to SQL Server Successfully
# ✅ Server running on [http://localhost:3001](http://localhost:3001)
```

---

## 🧪 STEP 4: TEST DATABASE CONNECTION (2 minutes)

### Test API Health
```bash
# Open browser or Postman
[http://localhost:3001/api/health](http://localhost:3001/api/health)

# Should return:
{
  "status": "ok",
  "message": "Travel Co API Server is running",
  "timestamp": "2026-01-28T..."
}
```

### Test Database Insert
```bash
# Create a customer
POST http://localhost:3001/api/customers
Body:
{
  "Name": "Test User",
  "Email": "test@example.com",
  "Phone": "9876543210",
  "Age": 30,
  "EmergencyContact": "Test Contact"
}

# Should return customer with ID
```

---

## 🔄 STEP 5: UPDATE REACT COMPONENTS (5 minutes)

### Replace Supabase with SQL Server

**Before (Old - Supabase):**
```typescript
import { supabase } from "../supabase/client";

const { data, error } = await supabase
  .from("customers")
  .insert([{ email, name, ... }]);
```

**After (New - SQL Server):**
```typescript
import { database } from "../services/database";

const data = await database.createCustomer({
  Email: email,
  Name: name,
  ...
});
```

### Files to Update:
1. **Login.tsx** - Replace signup/login logic
2. **RoutePlanner.tsx** - Replace trip creation
3. **TransportBooking.tsx** - Replace booking logic
4. **ReviewBooking.tsx** - Replace accommodation logic
5. **PaymentGateway.tsx** - Replace payment logic

---

## 📊 FILE LOCATIONS

```
Travel_Co_Project/src/
├── database/
│   ├── sqlserver-setup.sql          ← Database schema
│   └── setup.ps1                    ← Automated setup script
├── services/
│   └── database.ts                  ← React database service
├── backend/
│   └── server.js                    ← API backend server
├── .env.example                     ← Configuration template
├── SETUP_COMPLETE.md                ← Detailed setup guide
├── DATABASE_CONNECTION_GUIDE.md     ← Connection reference
└── QUICK_START.md                   ← This file
```

---

## ✅ VERIFICATION CHECKLIST

- [ ] Database created in SQL Server
- [ ] All 5 tables exist (Customers, Trips, TransportBookings, AccommodationBookings, Payments)
- [ ] Backend server running on http://localhost:3001
- [ ] Health check endpoint responds
- [ ] Can create customer successfully
- [ ] .env file configured with credentials
- [ ] React components updated to use database service
- [ ] Application starts without errors

---

## 🐛 QUICK TROUBLESHOOTING

### "Cannot connect to SQL Server"
- Verify SQL Server service is running
- Check firewall allows TCP:1433
- Verify credentials in .env

### "Database does not exist"
- Run sqlserver-setup.sql script first
- Check script executed without errors

### "API not responding"
- Verify backend server is running: `node backend/server.js`
- Check port 3001 is not in use
- Verify database is accessible

### "React components won't import database service"
- Check `services/database.ts` exists
- Verify correct import path: `import { database } from '../services/database'`
- Check no syntax errors in component files

---

## 📞 API ENDPOINTS REFERENCE

### Customers
```
POST   /api/customers                    - Create customer
GET    /api/customers/:id                - Get customer by ID
GET    /api/customers/email/:email       - Get customer by email
PUT    /api/customers/:id                - Update customer
```

### Trips
```
POST   /api/trips                        - Create trip
GET    /api/trips/:id                    - Get trip
GET    /api/trips/customer/:customerId   - Get all trips for customer
PUT    /api/trips/:id                    - Update trip
GET    /api/trips/:id/summary            - Get trip summary
```

### Transport Bookings
```
POST   /api/transport-bookings           - Create booking
GET    /api/transport-bookings/trip/:id  - Get trip bookings
```

### Accommodations
```
POST   /api/accommodation-bookings       - Create booking
GET    /api/accommodation-bookings/trip/:id - Get trip bookings
```

### Payments
```
POST   /api/payments                     - Create payment
GET    /api/payments/trip/:tripId        - Get trip payments
GET    /api/payments/transaction/:id     - Get payment by transaction ID
PUT    /api/payments/:id                 - Update payment status
```

---

## 🎓 DATABASE SCHEMA SUMMARY

### 5 Tables
1. **Customers** - User profiles (CustomerID)
2. **Trips** - Trip itineraries (TripID)
3. **TransportBookings** - Transport reservations (BookingID)
4. **AccommodationBookings** - Hotel reservations (BookingID)
5. **Payments** - Payment records (PaymentID)

### Relationships
- One Customer → Many Trips
- One Trip → Many TransportBookings
- One Trip → Many AccommodationBookings
- One Trip → Many Payments

### Indexes (14)
Optimized for common queries on CustomerID, TripID, Email, etc.

### Triggers (5)
Auto-update UpdatedAt timestamp on modifications

### Stored Procedures (2)
- SP_GetCustomerFullData - Complete customer overview
- SP_GetTripSummary - Trip cost summary

---

## 🎉 YOU'RE ALL SET!

Everything is ready to go. Follow the 5 steps above and your Travel Co application will be running with SQL Server!

**Next Action:** Start with Step 1 (Create Database)

Questions? Check the detailed guides:
- **SETUP_COMPLETE.md** - Full step-by-step guide
- **DATABASE_CONNECTION_GUIDE.md** - Connection details and examples

Good luck! 🚀
