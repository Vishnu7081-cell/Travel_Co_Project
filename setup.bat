@echo off
REM Travel Co MERN Stack - Quick Start Script for Windows

echo.
echo ====================================================================
echo           Travel Co - MERN Stack Quick Start
echo ====================================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed. 
    echo Please install from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js found
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: npm is not installed
    pause
    exit /b 1
)

echo [OK] npm found
echo.

REM Setup Backend
echo Setting up Backend...
cd backend

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo [OK] Backend dependencies already installed
)

if not exist ".env" (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo [WARNING] Edit .env with your settings
) else (
    echo [OK] .env file exists
)

cd ..
echo.

REM Setup Frontend
echo Setting up Frontend...
cd frontend

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo [OK] Frontend dependencies already installed
)

cd ..
echo.

echo ====================================================================
echo                    Setup Complete!
echo ====================================================================
echo.
echo NEXT STEPS:
echo.
echo 1. Start Backend (Command Prompt 1):
echo    cd backend ^& npm run dev
echo.
echo 2. Start Frontend (Command Prompt 2):
echo    cd frontend ^& npm run dev
echo.
echo 3. Open Browser:
echo    http://localhost:5173
echo.
echo 4. Create Account and Start Planning Trips!
echo.
echo Documentation: See MERN_SETUP_GUIDE.md
echo API Health: http://localhost:5000/api/health
echo.
pause
