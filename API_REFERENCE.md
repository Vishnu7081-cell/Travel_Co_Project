# Travel Co API - Quick Reference

## 🚀 Running the Application

### Start Backend
```bash
cd backend
npm run dev
# Runs on: http://localhost:5000
```

### Start Frontend
```bash
cd frontend
npm run dev
# Runs on: http://localhost:5173
```

---

## 📡 API Base URL
```
http://localhost:5000/api
```

---

## 🔐 Authentication
All endpoints (except auth) require:
```
Authorization: Bearer {JWT_TOKEN}
```

Token is received on login and stored in localStorage.

---

## 👤 CUSTOMERS API

### Create Customer (Register)
```
POST /customers
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890"
}

Response: 200
{
  "_id": "ObjectId",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890"
}
```

### Get All Customers
```
GET /customers
Authorization: Bearer {token}

Response: 200
[
  { "_id": "...", "name": "...", "email": "...", ... },
  ...
]
```

### Get Customer by ID
```
GET /customers/:customerId
Authorization: Bearer {token}

Response: 200
{
  "_id": "...",
  "name": "...",
  "email": "...",
  ...
}
```

### Update Customer
```
PUT /customers/:customerId
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Jane Doe",
  "phone": "9876543210"
}

Response: 200
Updated customer object
```

### Delete Customer
```
DELETE /customers/:customerId
Authorization: Bearer {token}

Response: 200
{ "message": "Customer deleted successfully" }
```

---

## ✈️ TRIPS API

### Create Trip
```
POST /trips
Authorization: Bearer {token}
Content-Type: application/json

{
  "customerId": "user_id",
  "tripName": "Summer Vacation 2024",
  "startState": "California",
  "destinationDistrict": "San Francisco",
  "startDate": "2024-06-01",
  "endDate": "2024-06-10",
  "numberOfTravelers": 2,
  "maxDailyHours": 6,
  "restFrequency": 2,
  "wheelchairAccessible": false,
  "nearbyHospitals": true,
  "nearbyPharmacies": false,
  "totalBudget": 5000
}

Response: 201
Created trip object
```

### Get All Trips
```
GET /trips
Authorization: Bearer {token}

Response: 200
[trip1, trip2, ...]
```

### Get Customer's Trips
```
GET /trips/customer/:customerId
Authorization: Bearer {token}

Response: 200
[trip1, trip2, ...]
```

### Get Trip by ID
```
GET /trips/:tripId
Authorization: Bearer {token}

Response: 200
Trip object with all details
```

### Update Trip
```
PUT /trips/:tripId
Authorization: Bearer {token}
Content-Type: application/json

{
  "tripName": "Updated Trip Name",
  "totalBudget": 6000,
  "status": "Booked"
}

Response: 200
Updated trip object
```

### Delete Trip
```
DELETE /trips/:tripId
Authorization: Bearer {token}

Response: 200
{ "message": "Trip deleted successfully" }
```

---

## 🚌 TRANSPORT BOOKINGS API

### Create Transport Booking
```
POST /transport-bookings
Authorization: Bearer {token}
Content-Type: application/json

{
  "tripId": "trip_id",
  "customerId": "user_id",
  "transportType": "Flight",
  "transportName": "AI101",
  "vendor": "Air India",
  "fromLocation": "New York",
  "toLocation": "Boston",
  "departureTime": "2024-06-01T10:00:00",
  "arrivalTime": "2024-06-01T12:00:00",
  "seats": 2,
  "price": 300,
  "safetyScore": 4.8,
  "amenities": ["WiFi", "Meals"],
  "notes": "Window seats preferred"
}

Response: 201
Created booking object
```

### Get All Transport Bookings
```
GET /transport-bookings
Authorization: Bearer {token}

Response: 200
[booking1, booking2, ...]
```

### Get Trip's Transport Bookings
```
GET /transport-bookings/trip/:tripId
Authorization: Bearer {token}

Response: 200
[booking1, booking2, ...]
```

### Get Booking by ID
```
GET /transport-bookings/:bookingId
Authorization: Bearer {token}

Response: 200
Booking object
```

### Update Transport Booking
```
PUT /transport-bookings/:bookingId
Authorization: Bearer {token}
Content-Type: application/json

{
  "seats": 3,
  "bookingStatus": "Confirmed"
}

Response: 200
Updated booking object
```

### Cancel Transport Booking
```
DELETE /transport-bookings/:bookingId
Authorization: Bearer {token}

Response: 200
{ "message": "Booking deleted successfully" }
```

---

## 🏨 ACCOMMODATION BOOKINGS API

### Create Accommodation Booking
```
POST /accommodation-bookings
Authorization: Bearer {token}
Content-Type: application/json

{
  "tripId": "trip_id",
  "customerId": "user_id",
  "hotelName": "The Grand Hotel",
  "location": "Downtown Boston",
  "roomType": "Double",
  "checkInDate": "2024-06-01",
  "checkOutDate": "2024-06-10",
  "nights": 9,
  "pricePerNight": 150,
  "amenities": ["WiFi", "Pool", "Gym"],
  "starRating": 4.5,
  "bookedRooms": 2,
  "specialRequests": "High floor, city view"
}

Response: 201
Created booking object (includes totalPrice calculated)
```

### Get All Accommodation Bookings
```
GET /accommodation-bookings
Authorization: Bearer {token}

Response: 200
[booking1, booking2, ...]
```

### Get Trip's Accommodation Bookings
```
GET /accommodation-bookings/trip/:tripId
Authorization: Bearer {token}

Response: 200
[booking1, booking2, ...]
```

### Get Booking by ID
```
GET /accommodation-bookings/:bookingId
Authorization: Bearer {token}

Response: 200
Booking object
```

### Update Accommodation Booking
```
PUT /accommodation-bookings/:bookingId
Authorization: Bearer {token}
Content-Type: application/json

{
  "bookedRooms": 3,
  "bookingStatus": "Confirmed"
}

Response: 200
Updated booking object
```

### Cancel Accommodation Booking
```
DELETE /accommodation-bookings/:bookingId
Authorization: Bearer {token}

Response: 200
{ "message": "Booking deleted successfully" }
```

---

## 💳 PAYMENTS API

### Create Payment
```
POST /payments
Authorization: Bearer {token}
Content-Type: application/json

{
  "tripId": "trip_id",
  "customerId": "user_id",
  "amount": 2500,
  "paymentMethod": "Credit Card",
  "transactionId": "TXN-123456789",
  "paymentGateway": "Stripe",
  "breakdown": {
    "transportCost": 600,
    "accommodationCost": 1350,
    "activityCost": 500,
    "tax": 50,
    "discount": 0
  }
}

Response: 201
Created payment object with status "Success"
```

### Get All Payments
```
GET /payments
Authorization: Bearer {token}

Response: 200
[payment1, payment2, ...]
```

### Get Trip's Payments
```
GET /payments/trip/:tripId
Authorization: Bearer {token}

Response: 200
[payment1, payment2, ...]
```

### Get Payment by ID
```
GET /payments/:paymentId
Authorization: Bearer {token}

Response: 200
Payment object
```

### Get Payment by Transaction ID
```
GET /payments/transaction/:transactionId
Authorization: Bearer {token}

Response: 200
Payment object (useful for verification)
```

### Update Payment Status
```
PUT /payments/:paymentId
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "Refunded",
  "failureReason": "Customer requested refund"
}

Response: 200
Updated payment object
```

### Delete Payment
```
DELETE /payments/:paymentId
Authorization: Bearer {token}

Response: 200
{ "message": "Payment deleted successfully" }
```

---

## ✅ HEALTH CHECK

### API Health Check
```
GET /api/health

Response: 200
{
  "status": "ok",
  "message": "Travel Co Backend is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "database": "Travelconew"
}
```

---

## 📊 COMMON STATUS VALUES

### Trip Status
- `Planning` - Trip is being planned
- `Booked` - All bookings confirmed
- `In Progress` - Trip is ongoing
- `Completed` - Trip finished
- `Cancelled` - Trip cancelled

### Booking Status
- `Pending` - Awaiting confirmation
- `Confirmed` - Booking confirmed
- `Cancelled` - Booking cancelled
- `Completed` - Booking completed

### Payment Status
- `Pending` - Payment awaiting
- `Success` - Payment successful
- `Failed` - Payment failed
- `Refunded` - Payment refunded

---

## 🛡️ ERROR RESPONSES

### Bad Request (400)
```json
{
  "success": false,
  "error": "Invalid request data"
}
```

### Unauthorized (401)
```json
{
  "success": false,
  "error": "JWT must be provided"
}
```

### Not Found (404)
```json
{
  "success": false,
  "error": "Customer not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "error": "Internal Server Error"
}
```

---

## 🔍 EXAMPLE WORKFLOWS

### Complete Booking Workflow

1. **Register User**
   ```
   POST /customers
   ```

2. **Create Trip**
   ```
   POST /trips
   ```

3. **Book Transport**
   ```
   POST /transport-bookings
   ```

4. **Book Hotel**
   ```
   POST /accommodation-bookings
   ```

5. **Get Cost Summary**
   ```
   GET /transport-bookings/trip/:tripId
   GET /accommodation-bookings/trip/:tripId
   ```

6. **Process Payment**
   ```
   POST /payments
   ```

7. **Verify Payment**
   ```
   GET /payments/transaction/:transactionId
   ```

8. **Get Trip Details**
   ```
   GET /trips/:tripId
   ```

---

## 🧪 CURL EXAMPLES

### Create Account
```bash
curl -X POST http://localhost:5000/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "pass123",
    "phone": "1234567890"
  }'
```

### Create Trip
```bash
curl -X POST http://localhost:5000/api/trips \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "USER_ID",
    "tripName": "Summer Vacation",
    "startState": "California",
    "destinationDistrict": "San Francisco",
    "startDate": "2024-06-01",
    "endDate": "2024-06-10",
    "numberOfTravelers": 2,
    "totalBudget": 5000
  }'
```

### Health Check
```bash
curl http://localhost:5000/api/health
```

---

## 💡 TIPS

- Always include `Authorization: Bearer {token}` header for protected endpoints
- Use `Content-Type: application/json` for POST/PUT requests
- Response `201` = Resource created successfully
- Response `200` = Request successful
- Check error messages for API validation details
- Tokens can be obtained from a login endpoint (to be implemented)

---

**Last Updated**: 2024
**API Version**: 1.0
**Status**: Production Ready ✅
