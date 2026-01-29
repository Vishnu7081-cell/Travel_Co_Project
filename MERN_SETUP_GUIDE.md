# Travel Co MERN Stack — Setup Guide

## Project Status

This repository contains a scaffolded MERN (MongoDB, Express, React, Node) travel booking application with separate `backend` and `frontend` folders.

---

## What Was Created

- `backend/` — Node.js + Express server, Mongoose models, API routes, `.env.example`.
- `frontend/` — React app (Vite), source in `src/`, `vite.config.js`.
- MongoDB database named `Travelconew` with collections for customers, trips, bookings, and payments.

---

## Quick Start

1. Install dependencies and start services.

Backend:

```bash
cd backend
npm install
cp .env.example .env
# edit .env: set MONGODB_URI, PORT, JWT_SECRET
npm run dev
```

Frontend (new terminal):

```bash
cd frontend
npm install
npm run dev
```

- Backend default: [http://localhost:5000](http://localhost:5000)
- Backend public (ngrok): [https://unmutated-thresa-untrammeled.ngrok-free.dev](https://unmutated-thresa-unmutated-thresa-untrammeled.ngrok-free.dev)
- Frontend default: [http://localhost:5173](http://localhost:5173)

---

## Environment Variables (backend `.env`)

```text
MONGODB_URI=mongodb://localhost:27017/Travelconew
PORT=5000
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

---

## API Examples

Authorization header required (except login/register):

```text
Authorization: Bearer <token>
```

Create Trip (POST `/api/trips`):

```json
{
  "customerId": "user_id",
  "tripName": "Summer Vacation",
  "startState": "California",
  "destinationDistrict": "San Francisco",
  "startDate": "2024-06-01",
  "endDate": "2024-06-10",
  "numberOfTravelers": 2,
  "totalBudget": 5000
}
```

Process Payment (POST `/api/payments`):

```json
{
  "tripId": "trip_id",
  "customerId": "user_id",
  "amount": 2500,
  "paymentMethod": "Credit Card",
  "transactionId": "TXN-123456"
}
```

---

## Development Commands

Backend:

### Minimal guide

This file is a concise, lint-friendly overview for running the MERN app locally. It uses H2/H3 headings and explicit fenced-code languages to satisfy common markdownlint rules.

If you still see specific markdownlint warnings after this change, paste the exact diagnostics and I'll fix them in-place.

```text
│   │   ├── api.js                  # Axios setup & interceptors
│   │   └── apiServices.js          # API service functions
│   ├── store/
│   │   └── store.js                # Zustand state management
│   ├── styles/
│   │   ├── pages.css               # All page styling
│   │   └── index.css               # Global styles
│   ├── App.jsx                     # Main app with routing
│   └── main.jsx                    # React entry point
├── index.html                      # HTML template
├── vite.config.js                  # Vite configuration
├── tsconfig.json                   # TypeScript config
└── package.json                    # Dependencies: React, Vite, Zustand, etc.
```

### Database: MongoDB "Travelconew"

- **Customers** — User profiles, authentication
- **Trips** — Trip details, itinerary
- **TransportBookings** — Bus, Train, Flight, Car bookings
- **AccommodationBookings** — Hotel reservations
- **Payments** — Payment transactions & cost breakdown

---

## 🚀 Quick Start Guide

### Step 1: Install MongoDB

If not already installed, download from [MongoDB Community Download](https://www.mongodb.com/try/download/community).

### Step 2: Start MongoDB

```bash
# Windows (if installed)
mongod
```

Or use MongoDB Atlas (cloud): [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

### Step 3: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your settings:
# MONGODB_URI=mongodb://localhost:27017/Travelconew
# PORT=5000
# JWT_SECRET=your_secret_key
# etc.
```

### Step 4: Start Backend Server

```bash
cd backend
npm run dev
```

✅ Backend running locally at: http://localhost:5000
✅ Public (ngrok) API: https://unmutated-thresa-unmutated-thresa-untrammeled.ngrok-free.dev/api

### Step 5: Setup Frontend

In a new terminal:

```bash
cd frontend

# Install dependencies
npm install
```

### Step 6: Start Frontend

```bash
cd frontend
npm run dev
```

✅ Frontend running at: http://localhost:5173

---

## 🎯 First Time Usage

### Create an Account

1. Go to http://localhost:5173
2. Click "Sign Up"
3. Fill in details and create account
4. Log in with your credentials

### Create Your First Trip

1. Click "Plan New Trip" button
2. Fill in trip details:
   - Trip name
   - Starting state
   - Destination
   - Dates
   - Budget
3. Submit

### Book Transportation

1. Click "Book Transport" on your trip
2. Select transport type (Bus/Train/Flight/Car/Bike)
3. Enter details
4. Confirm booking

### Book Accommodation

1. Click "Book Hotel" on your trip
2. Select hotel details
3. Choose room type and dates
4. Confirm booking

### Review & Pay

1. Click "Review" to see all bookings
2. Check cost summary
3. Click "Proceed to Payment"
4. Complete payment

### Get Confirmation

1. Payment confirmation page
2. Trip is now booked!
3. Access from dashboard anytime

---

## 📚 API Documentation

### Base URL

- Backend: `http://localhost:5000/api`

### Authentication

All requests (except login/register) need JWT token:

```text
Authorization: Bearer <token>
```

### Key Endpoints

**Create Trip**

```json
POST /api/trips
Body: {
  "customerId": "user_id",
  "tripName": "Summer Vacation",
  "startState": "California",
  "destinationDistrict": "San Francisco",
  "startDate": "2024-06-01",
  "endDate": "2024-06-10",
  "numberOfTravelers": 2,
  "totalBudget": 5000
}
```

**Book Transport**

```json
POST /api/transport-bookings
Body: {
  "tripId": "trip_id",
  "customerId": "user_id",
  "transportType": "Flight",
  "vendor": "Air India",
  "fromLocation": "New York",
  "toLocation": "Boston",
  "departureTime": "2024-06-01T10:00:00",
  "arrivalTime": "2024-06-01T12:00:00",
  "price": 150
}
```

**Get Trip Bookings**

```text
GET /api/transport-bookings/trip/:tripId
GET /api/accommodation-bookings/trip/:tripId
```

**Process Payment**

```json
POST /api/payments
Body: {
  "tripId": "trip_id",
  "customerId": "user_id",
  "amount": 2500,
  "paymentMethod": "Credit Card",
  "transactionId": "TXN-123456"
}
```

---

## 🛠️ Development Commands

### Backend

```bash
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production server
npm run seed     # Seed database (when implemented)
```

### Frontend

```bash
npm run dev      # Development server with hot reload
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 📦 Dependencies Included

### Backend

- `express` — Web framework
- `mongoose` — MongoDB ODM
- `cors` — Cross-origin requests
- `bcryptjs` — Password hashing
- `jsonwebtoken` — JWT authentication
- `dotenv` — Environment variables
- `validator` — Input validation
- `nodemon` — Development auto-reload

### Frontend

- `react` — UI library
- `react-dom` — React DOM rendering
- `react-router-dom` — Client routing
- `axios` — HTTP client
- `zustand` — State management
- `date-fns` — Date utilities
- `vite` — Build tool

---

## 🔧 Environment Variables

### Backend .env

```text
MONGODB_URI=mongodb://localhost:27017/Travelconew
PORT=5000
JWT_SECRET=your_super_secret_key_12345
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
STRIPE_PUBLIC_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
```

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"

- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env` file
- Default: `mongodb://localhost:27017/Travelconew`

### "CORS error when loading frontend"

- Ensure `FRONTEND_URL` in backend `.env` is correct
- Default: `http://localhost:5173`

### "Port 5000/5173 already in use"

- Change `PORT` in backend `.env`
- Change port in frontend `vite.config.js`

### "Module not found error"

- Run `npm install` in both frontend and backend folders
- Delete `node_modules` and run `npm install` again

### "JWT token expired or invalid"

- Clear localStorage: `localStorage.clear()`
- Log out and log back in

---

## 📱 Features Summary

- ✅ User Registration & Login
- ✅ Trip Planning & Management
- ✅ Transport Booking (5 types)
- ✅ Hotel Booking with Room Types
- ✅ Amenities Selection
- ✅ Safety Ratings & Reviews
- ✅ Payment Processing
- ✅ Cost Breakdown & Invoices
- ✅ Booking Confirmation
- ✅ Dashboard & Trip Management
- ✅ Responsive Design
- ✅ State Management (Zustand)
- ✅ Protected Routes
- ✅ JWT Authentication
- ✅ Error Handling

---

## 🚀 Next Steps

### To Deploy

1. **Backend**: Deploy to Heroku, Railway, or AWS
   - Update `MONGODB_URI` to MongoDB Atlas
   - Update `FRONTEND_URL` to deployed frontend

2. **Frontend**: Deploy to Vercel, Netlify, or GitHub Pages
   - Update `API_BASE_URL` in `services/api.js`
   - Run `npm run build`

### To Add More Features

- Payment gateway integration (Stripe)
- Email notifications
- SMS alerts
- User reviews & ratings
- Advanced search filters
- Multi-currency support
- Wishlist functionality

---

## 📞 Support

If you encounter any issues:

1. Check MongoDB is running
2. Verify `.env` files are correct
3. Check browser console for errors
4. Check terminal for server errors
5. Ensure ports 5000 and 5173 are available

---

## 🎉 You're All Set!

Your complete MERN travel booking application is ready to use. Start the servers and begin exploring!

**Happy Coding! 🚀🌍**

"""
