# Cloud Deployment Guide 🌐

This guide will walk you through making your Travel Co project permanently live using **MongoDB Atlas** (Database) and **Render** (Hosting).

---

## Step 1: Set up MongoDB Atlas (Cloud Database)

1.  **Sign Up**: Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2.  **Create Cluster**: Follow the setup to create a **Free Tier (Shared)** cluster.
3.  **Database User**: In the "Security Quickstart", create a username and password. **Save these!**
4.  **IP Access List**: Add `0.0.0.0/0` (Allow access from anywhere) to the IP Access List.
5.  **Get Connection String**:
    - Click **Connect** -> **Drivers**.
    - Copy the connection string (it looks like `mongodb+srv://<db_username>:<db_password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`).
    - Replace `<db_password>` with your actual password.

---

## Step 2: Deploy to Render (Website Hosting)

1.  **Sign Up**: Go to [render.com](https://render.com) and create a free account using your GitHub.
2.  **New Web Service**: Click **New +** -> **Web Service**.
3.  **Connect GitHub**: Select your `Travel_Co_Project` repository.
4.  **Configure Service**:
    - **Name**: `travel-co-app` (or any name)
    - **Build Command**: `npm install && npm run build`
    - **Start Command**: `cd backend && npm install && npm start`
5.  **Environment Variables**:
    - Click **Advanced** -> **Add Environment Variable**.
    - Add `MONGODB_URI` and paste your connection string from Step 1.
    - Add `PORT` and set it to `10000` (Render's default).
    - Add `JWT_SECRET` and put any random word (e.g., `your_secret_key_123`).

---

## Step 3: Go Live!

1.  Click **Create Web Service**.
2.  Render will build and deploy your app. This takes about 3-5 minutes.
3.  Once finished, Render will give you a public URL like `https://travel-co-app.onrender.com`.

**That's it! Your website is now live 24/7.**

---

## Frequently Asked Questions

**Q: Do I need to keep my local terminal open?**
A: No! Once deployed to Render, your local computer can be turned off and the link will still work.

**Q: What about my local data?**
A: Since your local data is on your machine, it won't be on the cloud. New bookings will be saved to your MongoDB Atlas cloud database.

**Q: How do I update the website later?**
A: Just push new changes to your GitHub repository. Render will automatically detect the changes and redeploy your site!
