# MongoDB Setup Guide for `new_TravelCo` Database

## Current Status
✅ Backend code configured to connect to `new_TravelCo`  
✅ Environment variables set in `.env`  
❌ MongoDB is not installed/running on your system

## Choose Your Setup Method

### Option 1: MongoDB Atlas (Cloud - Recommended for Quick Start)

**Pros:** No installation needed, free tier available, accessible from anywhere  
**Cons:** Requires internet connection

#### Steps:
1. **Create MongoDB Atlas Account**
   - Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select your preferred region
   - Click "Create"

3. **Set Up Database Access**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
   - Set privileges to "Read and write to any database"

4. **Set Up Network Access**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Confirm

5. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/`)

6. **Update Your `.env` File**
   ```env
   MONGODB_URI=mongodb+srv://username:yourpassword@cluster0.xxxxx.mongodb.net/new_TravelCo?retryWrites=true&w=majority
   PORT=5000
   ```
   Replace:
   - `username` with your database username
   - `yourpassword` with your database password
   - `cluster0.xxxxx.mongodb.net` with your actual cluster address

7. **Run Initialization Script**
   ```bash
   cd backend
   node initDatabase.js
   ```

---

### Option 2: Local MongoDB Installation

**Pros:** No internet needed, full control, faster for development  
**Cons:** Requires installation and setup

#### Steps:

1. **Download MongoDB Community Server**
   - Go to [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   - Select:
     - Version: Latest (7.0+)
     - Platform: Windows
     - Package: MSI
   - Click "Download"

2. **Install MongoDB**
   - Run the downloaded `.msi` file
   - Choose "Complete" installation
   - **Important:** Check "Install MongoDB as a Service"
   - **Important:** Check "Install MongoDB Compass" (GUI tool)
   - Complete the installation

3. **Verify MongoDB is Running**
   ```powershell
   # Check if MongoDB service is running
   Get-Service -Name MongoDB
   ```
   
   If not running:
   ```powershell
   # Start MongoDB service
   Start-Service -Name MongoDB
   ```

4. **Add MongoDB to PATH (if needed)**
   - Open System Environment Variables
   - Add `C:\Program Files\MongoDB\Server\7.0\bin` to PATH
   - Restart PowerShell

5. **Verify Installation**
   ```bash
   mongod --version
   mongo --version
   ```

6. **Run Initialization Script**
   ```bash
   cd backend
   node initDatabase.js
   ```

---

## After Setup - Verify Database

Once MongoDB is set up (either option), run:

```bash
cd backend
node initDatabase.js
```

You should see:
```
✅ MongoDB Connected Successfully
📊 Database: new_TravelCo
✓ customers collection initialized
✓ trips collection initialized
✓ transportbookings collection initialized
✓ accommodationbookings collection initialized
✓ payments collection initialized
```

## Start Your Server

```bash
npm start
```

## Verify Everything Works

Visit: `http://localhost:5000/api/health`

You should see:
```json
{
  "status": "ok",
  "message": "Travel Co Backend is running",
  "timestamp": "...",
  "database": "new_TravelCo"
}
```

---

## Need Help?

- **MongoDB Atlas Documentation:** [https://docs.atlas.mongodb.com/](https://docs.atlas.mongodb.com/)
- **MongoDB Local Installation:** [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)
