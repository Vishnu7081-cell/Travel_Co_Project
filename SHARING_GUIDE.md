# How to Share Your Local Travel Co Project

This guide explains how to make your locally running website accessible to anyone on the internet using **ngrok**.

## Step 1: Install ngrok

> [!IMPORTANT]
> **If you see "The term '.\ngrok' is not recognized"**, it means the file `ngrok.exe` is missing from your project folder.

1.  **Download it**: Go to [ngrok.com/download](https://ngrok.com/download) and download for Windows.
2.  **Extract it**: You will get a file named `ngrok.exe`.
3.  **MOVE IT**: Drag and drop `ngrok.exe` into your project folder: `c:\Users\HP\Desktop\Travel_Co_Project`.
4.  **Verify**: You should see `ngrok.exe` sitting right next to your `package.json` file.

5.  **Connect your account**:
    ```powershell
    .\ngrok config add-authtoken YOUR_AUTH_TOKEN
    ```

## Step 1: Start Your Local Project

Make sure both your backend and frontend are running in separate terminals.

**Terminal 1 (Backend):**
```powershell
cd backend
npm start
```
*(Runs on port 5000)*

**Terminal 2 (Frontend):**
```powershell
npm run dev
```
*(Runs on port 5173 - check the exact port in your terminal)*

## Step 2: Create Public Tunnels

You need to expose both the backend (API) and the frontend (website). Open two **new** terminals for ngrok.

**Terminal 3 (Backend Tunnel):**
```powershell
ngrok http 5000
```
- Copy the **Forwarding URL** provided by ngrok (e.g., `https://api-1234.ngrok-free.app`).
- **This is your Public API URL.**

**Terminal 4 (Frontend Tunnel):**
```powershell
ngrok http 3000
```
*(Replace `3000` with your actual frontend port if different)*
- Copy this forwarding URL as well. **This is the link you send to your friends.**

## Step 3: Connect Frontend to Public Backend

By default, your shared frontend will still try to talk to `localhost:5000`, which won't work for other people. You need to tell it to use your **Public API URL**.

1.  Stop your frontend (Ctrl+C in Terminal 2).
2.  Restart it with the special environment variable:

**Windows PowerShell:**
```powershell
$env:VITE_API_URL="https://api-1234.ngrok-free.app/api"; npm run dev
```
*(Replace `https://api-1234.ngrok-free.app` with your **actual** backend ngrok URL from Step 2)*

**Command Prompt (cmd):**
```cmd
set VITE_API_URL=https://api-1234.ngrok-free.app/api && npm run dev
```

## Summary to Share

Once everything is running:

1.  **Backend** is running and tunneled (Terminals 1 & 3).
2.  **Frontend** is running pointing to the *public* backend URL (Terminal 2).
3.  **Frontend Tunnel** is running (Terminal 4).

**Send the Frontend Tunnel URL** (from Terminal 4) to anyone you want to show the project to!

## Frequently Asked Questions

### Will data be saved?
**YES.** Since the backend is running on your computer, any data entered by people using your link will be saved directly to your **local MongoDB database**. It works exactly the same as if you were using it locally.
