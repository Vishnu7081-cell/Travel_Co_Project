# SQL Server Database Setup Guide for Travel Co Project

## Overview

Your Travel Co application uses SQL Server as the backend database. This guide shows the core steps to create the database and a sample table using SQL Server Management Studio (SSMS).

## Prerequisites

- SQL Server 2016 or higher
- SQL Server Management Studio (SSMS)
- Administrator access to create databases and tables

## Create the database

Open SSMS and run the following SQL to create the database (adjust paths and names for your system):

```sql
CREATE DATABASE Travel_Co_DB
  CONTAINMENT = NONE
  ON PRIMARY 
  ( NAME = Travel_Co_DB_Data, FILENAME = 'C:\\Program Files\\Microsoft SQL Server\\MSSQL15\\MSSQL\\DATA\\Travel_Co_DB.mdf', SIZE = 8MB, MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
  LOG ON 
  ( NAME = Travel_Co_DB_Log, FILENAME = 'C:\\Program Files\\Microsoft SQL Server\\MSSQL15\\MSSQL\\DATA\\Travel_Co_DB.ldf', SIZE = 4MB, FILEGROWTH = 65536KB );
GO
```

## Create a sample table

Switch to the new database and create a sample `Customers` table:

```sql
USE Travel_Co_DB;
GO

CREATE TABLE Customers (
  CustomerId INT IDENTITY(1,1) PRIMARY KEY,
  FirstName NVARCHAR(100) NOT NULL,
  LastName NVARCHAR(100) NOT NULL,
  Email NVARCHAR(255) UNIQUE NOT NULL,
  CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
);
GO
```

## Next steps

- Add remaining tables (Trips, TransportBookings, AccommodationBookings, Payments) following the same pattern.
- Create indexes and foreign keys as needed.

If you want, I can add full CREATE TABLE statements for all project tables.
