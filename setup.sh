#!/bin/bash

# 🚀 Travel Co MERN Stack - Quick Start Script
# This script helps you get started quickly

echo "╔═══════════════════════════════════════════════════════════════════╗"
echo "║          Travel Co - MERN Stack Quick Start                       ║"
echo "╚═══════════════════════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo "✅ npm found: $(npm --version)"
echo ""

# Check if MongoDB is running
echo "🔍 Checking MongoDB connection..."
mongosh --eval "db.version()" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ MongoDB is running"
else
    echo "⚠️  MongoDB might not be running"
    echo "   Start MongoDB with: mongod"
    echo ""
fi

echo "📦 Setting up Backend..."
cd backend

if [ ! -d "node_modules" ]; then
    echo "   Installing dependencies..."
    npm install
else
    echo "   ✅ Dependencies already installed"
fi

if [ ! -f ".env" ]; then
    echo "   Creating .env file from .env.example..."
    cp .env.example .env
    echo "   ⚠️  Please edit .env with your settings"
else
    echo "   ✅ .env file exists"
fi

cd ..

echo ""
echo "📦 Setting up Frontend..."
cd frontend

if [ ! -d "node_modules" ]; then
    echo "   Installing dependencies..."
    npm install
else
    echo "   ✅ Dependencies already installed"
fi

cd ..

echo ""
echo "╔═══════════════════════════════════════════════════════════════════╗"
echo "║                    Setup Complete! 🎉                             ║"
echo "╚═══════════════════════════════════════════════════════════════════╝"
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Start Backend (Terminal 1):"
echo "   cd backend && npm run dev"
echo ""
echo "2. Start Frontend (Terminal 2):"
echo "   cd frontend && npm run dev"
echo ""
echo "3. Open Browser:"
echo "   http://localhost:5173"
echo ""
echo "4. Create Account:"
echo "   Sign up with your email and password"
echo ""
echo "5. Start Planning Trips!"
echo ""
echo "📚 Documentation: See MERN_SETUP_GUIDE.md for detailed instructions"
echo "🌐 API Health Check: http://localhost:5000/api/health"
echo ""
