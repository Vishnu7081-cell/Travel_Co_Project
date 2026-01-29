#!/usr/bin/env powershell
# ============================================
# SQL SERVER DATABASE QUICK SETUP
# Run this to execute the database setup
# ============================================

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   TRAVEL CO - SQL SERVER DATABASE SETUP                   ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check if sqlcmd is available
$sqlcmdCheck = Get-Command sqlcmd -ErrorAction SilentlyContinue
if (-not $sqlcmdCheck) {
    Write-Host "❌ ERROR: sqlcmd is not installed or not in PATH" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install SQL Server Command Line Tools (sqlcmd)" -ForegroundColor Yellow
    Write-Host "Download from: https://learn.microsoft.com/en-us/sql/tools/sqlcmd/sqlcmd-utility" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

# Get SQL Server details
Write-Host "📋 Enter SQL Server Connection Details:" -ForegroundColor Yellow
Write-Host ""

$serverName = Read-Host "  Server Name (default: localhost)"
if ([string]::IsNullOrWhiteSpace($serverName)) {
    $serverName = "localhost"
}

$username = Read-Host "  Username (default: sa)"
if ([string]::IsNullOrWhiteSpace($username)) {
    $username = "sa"
}

$password = Read-Host "  Password" -AsSecureString
$passwordPlain = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToCoTaskMemUnicode($password))

Write-Host ""
Write-Host "🔗 Connecting to: $serverName" -ForegroundColor Cyan
Write-Host ""

# Get script path
$scriptPath = Join-Path $PSScriptRoot "database\sqlserver-setup.sql"

if (-not (Test-Path $scriptPath)) {
    Write-Host "❌ ERROR: SQL setup script not found at $scriptPath" -ForegroundColor Red
    exit 1
}

Write-Host "📂 Using script: $scriptPath" -ForegroundColor Cyan
Write-Host ""
Write-Host "⏳ Executing database setup... This may take a moment..." -ForegroundColor Yellow
Write-Host ""

# Execute the SQL script
try {
    sqlcmd -S $serverName -U $username -P $passwordPlain -i $scriptPath -b
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
        Write-Host "║   ✅ DATABASE SETUP COMPLETE!                              ║" -ForegroundColor Green
        Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
        Write-Host ""
        Write-Host "📊 Database Created: Travel_Co_DB" -ForegroundColor Green
        Write-Host "📊 Tables Created: 5" -ForegroundColor Green
        Write-Host "📊 Indexes Created: 14" -ForegroundColor Green
        Write-Host "📊 Triggers Created: 5" -ForegroundColor Green
        Write-Host "📊 Stored Procedures Created: 2" -ForegroundColor Green
        Write-Host ""
        Write-Host "📖 Next Steps:" -ForegroundColor Cyan
        Write-Host "  1. Read DATABASE_CONNECTION_GUIDE.md for detailed instructions" -ForegroundColor Cyan
        Write-Host "  2. Create .env file from .env.example" -ForegroundColor Cyan
        Write-Host "  3. Set up backend API server (Node.js/Express or .NET)" -ForegroundColor Cyan
        Write-Host "  4. Update React components to use database service" -ForegroundColor Cyan
        Write-Host ""
    } else {
        Write-Host "❌ ERROR: Database setup failed with exit code $LASTEXITCODE" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ ERROR: Failed to execute database setup" -ForegroundColor Red
    Write-Host "Details: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "🎉 Setup complete! Your database is ready to use." -ForegroundColor Green
Write-Host ""
