-- ============================================
-- TRAVEL CO DATABASE SCHEMA (SQL SERVER)
-- ============================================
-- Created for SQL Server Management Studio
-- Database: Travel_Co_DB
-- ============================================

-- ============================================
-- 1. CUSTOMERS TABLE
-- ============================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Customers]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Customers] (
  [CustomerID] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [Name] NVARCHAR(255) NOT NULL,
  [Email] NVARCHAR(255) NOT NULL UNIQUE,
  [Phone] NVARCHAR(20),
  [Age] INT,
  [EmergencyContact] NVARCHAR(255),
  [CreatedAt] DATETIME2 DEFAULT GETUTCDATE(),
  [UpdatedAt] DATETIME2 DEFAULT GETUTCDATE()
);
END
GO

-- ============================================
-- 2. TRIPS TABLE
-- ============================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Trips]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Trips] (
  [TripID] BIGINT PRIMARY KEY IDENTITY(1,1),
  [CustomerID] UNIQUEIDENTIFIER NOT NULL REFERENCES [dbo].[Customers]([CustomerID]) ON DELETE CASCADE,
  [StartState] NVARCHAR(255) NOT NULL,
  [DestinationDistrict] NVARCHAR(255) NOT NULL,
  [StartDate] DATE NOT NULL,
  [MaxDailyHours] INT,
  [RestFrequency] INT,
  [WheelchairAccessible] BIT DEFAULT 0,
  [NearbyHospitals] BIT DEFAULT 0,
  [NearbyPharmacies] BIT DEFAULT 0,
  [PaymentStatus] NVARCHAR(50) DEFAULT 'Pending',
  [CreatedAt] DATETIME2 DEFAULT GETUTCDATE(),
  [UpdatedAt] DATETIME2 DEFAULT GETUTCDATE()
);
END
GO

-- ============================================
-- 3. TRANSPORT BOOKINGS TABLE
-- ============================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TransportBookings]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[TransportBookings] (
  [BookingID] BIGINT PRIMARY KEY IDENTITY(1,1),
  [TripID] BIGINT NOT NULL REFERENCES [dbo].[Trips]([TripID]) ON DELETE CASCADE,
  [CustomerID] UNIQUEIDENTIFIER NOT NULL REFERENCES [dbo].[Customers]([CustomerID]) ON DELETE CASCADE,
  [TransportType] NVARCHAR(100) NOT NULL,
  [TransportName] NVARCHAR(255) NOT NULL,
  [Vendor] NVARCHAR(255),
  [Price] DECIMAL(10, 2) NOT NULL,
  [Duration] NVARCHAR(100),
  [SafetyScore] DECIMAL(3, 2),
  [BookingStatus] NVARCHAR(50) DEFAULT 'Confirmed',
  [CreatedAt] DATETIME2 DEFAULT GETUTCDATE(),
  [UpdatedAt] DATETIME2 DEFAULT GETUTCDATE()
);
END
GO

-- ============================================
-- 4. ACCOMMODATION BOOKINGS TABLE
-- ============================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[AccommodationBookings]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[AccommodationBookings] (
  [BookingID] BIGINT PRIMARY KEY IDENTITY(1,1),
  [TripID] BIGINT NOT NULL REFERENCES [dbo].[Trips]([TripID]) ON DELETE CASCADE,
  [CustomerID] UNIQUEIDENTIFIER NOT NULL REFERENCES [dbo].[Customers]([CustomerID]) ON DELETE CASCADE,
  [HotelName] NVARCHAR(255) NOT NULL,
  [RoomType] NVARCHAR(100),
  [PricePerNight] DECIMAL(10, 2) NOT NULL,
  [Nights] INT DEFAULT 1,
  [TotalPrice] DECIMAL(10, 2) NOT NULL,
  [CheckInDate] DATE,
  [CheckOutDate] DATE,
  [BookingStatus] NVARCHAR(50) DEFAULT 'Confirmed',
  [CreatedAt] DATETIME2 DEFAULT GETUTCDATE(),
  [UpdatedAt] DATETIME2 DEFAULT GETUTCDATE()
);
END
GO

-- ============================================
-- 5. PAYMENTS TABLE
-- ============================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Payments]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Payments] (
  [PaymentID] BIGINT PRIMARY KEY IDENTITY(1,1),
  [TripID] BIGINT NOT NULL REFERENCES [dbo].[Trips]([TripID]) ON DELETE CASCADE,
  [CustomerID] UNIQUEIDENTIFIER NOT NULL REFERENCES [dbo].[Customers]([CustomerID]) ON DELETE CASCADE,
  [Amount] DECIMAL(10, 2) NOT NULL,
  [PaymentMethod] NVARCHAR(50),
  [TransactionID] NVARCHAR(100) NOT NULL UNIQUE,
  [Status] NVARCHAR(50) DEFAULT 'pending',
  [PaidAt] DATETIME2,
  [CreatedAt] DATETIME2 DEFAULT GETUTCDATE(),
  [UpdatedAt] DATETIME2 DEFAULT GETUTCDATE()
);
END
GO

-- ============================================
-- INDEXES FOR PERFORMANCE OPTIMIZATION
-- ============================================

-- Customers indexes
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Customers_Email')
CREATE INDEX [IX_Customers_Email] ON [dbo].[Customers]([Email]);
GO

-- Trips indexes
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Trips_CustomerID')
CREATE INDEX [IX_Trips_CustomerID] ON [dbo].[Trips]([CustomerID]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Trips_StartDate')
CREATE INDEX [IX_Trips_StartDate] ON [dbo].[Trips]([StartDate]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Trips_PaymentStatus')
CREATE INDEX [IX_Trips_PaymentStatus] ON [dbo].[Trips]([PaymentStatus]);
GO

-- Transport Bookings indexes
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_TransportBookings_TripID')
CREATE INDEX [IX_TransportBookings_TripID] ON [dbo].[TransportBookings]([TripID]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_TransportBookings_CustomerID')
CREATE INDEX [IX_TransportBookings_CustomerID] ON [dbo].[TransportBookings]([CustomerID]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_TransportBookings_TransportType')
CREATE INDEX [IX_TransportBookings_TransportType] ON [dbo].[TransportBookings]([TransportType]);
GO

-- Accommodation Bookings indexes
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_AccommodationBookings_TripID')
CREATE INDEX [IX_AccommodationBookings_TripID] ON [dbo].[AccommodationBookings]([TripID]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_AccommodationBookings_CustomerID')
CREATE INDEX [IX_AccommodationBookings_CustomerID] ON [dbo].[AccommodationBookings]([CustomerID]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_AccommodationBookings_HotelName')
CREATE INDEX [IX_AccommodationBookings_HotelName] ON [dbo].[AccommodationBookings]([HotelName]);
GO

-- Payments indexes
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Payments_TripID')
CREATE INDEX [IX_Payments_TripID] ON [dbo].[Payments]([TripID]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Payments_CustomerID')
CREATE INDEX [IX_Payments_CustomerID] ON [dbo].[Payments]([CustomerID]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Payments_TransactionID')
CREATE INDEX [IX_Payments_TransactionID] ON [dbo].[Payments]([TransactionID]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Payments_Status')
CREATE INDEX [IX_Payments_Status] ON [dbo].[Payments]([Status]);
GO

-- ============================================
-- TRIGGERS FOR AUTOMATIC TIMESTAMP UPDATES
-- ============================================

IF OBJECT_ID (N'dbo.TR_Customers_UpdateTimestamp', N'TR') IS NOT NULL
   DROP TRIGGER [dbo].[TR_Customers_UpdateTimestamp];
GO

CREATE TRIGGER [dbo].[TR_Customers_UpdateTimestamp]
ON [dbo].[Customers]
AFTER UPDATE
AS
BEGIN
  UPDATE [dbo].[Customers]
  SET [UpdatedAt] = GETUTCDATE()
  WHERE [CustomerID] IN (SELECT DISTINCT [CustomerID] FROM inserted)
END
GO

IF OBJECT_ID (N'dbo.TR_Trips_UpdateTimestamp', N'TR') IS NOT NULL
   DROP TRIGGER [dbo].[TR_Trips_UpdateTimestamp];
GO

CREATE TRIGGER [dbo].[TR_Trips_UpdateTimestamp]
ON [dbo].[Trips]
AFTER UPDATE
AS
BEGIN
  UPDATE [dbo].[Trips]
  SET [UpdatedAt] = GETUTCDATE()
  WHERE [TripID] IN (SELECT DISTINCT [TripID] FROM inserted)
END
GO

IF OBJECT_ID (N'dbo.TR_TransportBookings_UpdateTimestamp', N'TR') IS NOT NULL
   DROP TRIGGER [dbo].[TR_TransportBookings_UpdateTimestamp];
GO

CREATE TRIGGER [dbo].[TR_TransportBookings_UpdateTimestamp]
ON [dbo].[TransportBookings]
AFTER UPDATE
AS
BEGIN
  UPDATE [dbo].[TransportBookings]
  SET [UpdatedAt] = GETUTCDATE()
  WHERE [BookingID] IN (SELECT DISTINCT [BookingID] FROM inserted)
END
GO

IF OBJECT_ID (N'dbo.TR_AccommodationBookings_UpdateTimestamp', N'TR') IS NOT NULL
   DROP TRIGGER [dbo].[TR_AccommodationBookings_UpdateTimestamp];
GO

CREATE TRIGGER [dbo].[TR_AccommodationBookings_UpdateTimestamp]
ON [dbo].[AccommodationBookings]
AFTER UPDATE
AS
BEGIN
  UPDATE [dbo].[AccommodationBookings]
  SET [UpdatedAt] = GETUTCDATE()
  WHERE [BookingID] IN (SELECT DISTINCT [BookingID] FROM inserted)
END
GO

IF OBJECT_ID (N'dbo.TR_Payments_UpdateTimestamp', N'TR') IS NOT NULL
   DROP TRIGGER [dbo].[TR_Payments_UpdateTimestamp];
GO

CREATE TRIGGER [dbo].[TR_Payments_UpdateTimestamp]
ON [dbo].[Payments]
AFTER UPDATE
AS
BEGIN
  UPDATE [dbo].[Payments]
  SET [UpdatedAt] = GETUTCDATE()
  WHERE [PaymentID] IN (SELECT DISTINCT [PaymentID] FROM inserted)
END
GO

-- ============================================
-- STORED PROCEDURES FOR COMMON OPERATIONS
-- ============================================

-- Procedure to get customer with all bookings
IF OBJECT_ID (N'dbo.SP_GetCustomerFullData', N'P') IS NOT NULL
   DROP PROCEDURE [dbo].[SP_GetCustomerFullData];
GO

CREATE PROCEDURE [dbo].[SP_GetCustomerFullData]
    @CustomerID UNIQUEIDENTIFIER
AS
BEGIN
    SELECT 
        c.[CustomerID], c.[Name], c.[Email], c.[Phone], c.[Age], c.[EmergencyContact],
        t.[TripID], t.[StartState], t.[DestinationDistrict], t.[StartDate], t.[PaymentStatus],
        tb.[BookingID] AS [TransportBookingID], tb.[TransportType], tb.[Price] AS [TransportPrice],
        ab.[BookingID] AS [AccommodationBookingID], ab.[HotelName], ab.[TotalPrice] AS [AccommodationPrice],
        p.[PaymentID], p.[Amount], p.[Status] AS [PaymentStatus]
    FROM [dbo].[Customers] c
    LEFT JOIN [dbo].[Trips] t ON c.[CustomerID] = t.[CustomerID]
    LEFT JOIN [dbo].[TransportBookings] tb ON t.[TripID] = tb.[TripID]
    LEFT JOIN [dbo].[AccommodationBookings] ab ON t.[TripID] = ab.[TripID]
    LEFT JOIN [dbo].[Payments] p ON t.[TripID] = p.[TripID]
    WHERE c.[CustomerID] = @CustomerID
    ORDER BY t.[CreatedAt] DESC
END
GO

-- Procedure to get trip summary
IF OBJECT_ID (N'dbo.SP_GetTripSummary', N'P') IS NOT NULL
   DROP PROCEDURE [dbo].[SP_GetTripSummary];
GO

CREATE PROCEDURE [dbo].[SP_GetTripSummary]
    @TripID BIGINT
AS
BEGIN
    SELECT 
        t.[TripID],
        t.[CustomerID],
        c.[Name] AS [CustomerName],
        t.[StartState],
        t.[DestinationDistrict],
        t.[StartDate],
        COUNT(DISTINCT tb.[BookingID]) AS [TransportBookingCount],
        COUNT(DISTINCT ab.[BookingID]) AS [AccommodationBookingCount],
        COUNT(DISTINCT p.[PaymentID]) AS [PaymentCount],
        SUM(CASE WHEN tb.[BookingID] IS NOT NULL THEN tb.[Price] ELSE 0 END) AS [TotalTransportCost],
        SUM(CASE WHEN ab.[BookingID] IS NOT NULL THEN ab.[TotalPrice] ELSE 0 END) AS [TotalAccommodationCost],
        SUM(CASE WHEN p.[PaymentID] IS NOT NULL THEN p.[Amount] ELSE 0 END) AS [TotalPaid],
        t.[PaymentStatus]
    FROM [dbo].[Trips] t
    JOIN [dbo].[Customers] c ON t.[CustomerID] = c.[CustomerID]
    LEFT JOIN [dbo].[TransportBookings] tb ON t.[TripID] = tb.[TripID]
    LEFT JOIN [dbo].[AccommodationBookings] ab ON t.[TripID] = ab.[TripID]
    LEFT JOIN [dbo].[Payments] p ON t.[TripID] = p.[TripID]
    WHERE t.[TripID] = @TripID
    GROUP BY 
        t.[TripID], t.[CustomerID], c.[Name], t.[StartState], 
        t.[DestinationDistrict], t.[StartDate], t.[PaymentStatus]
END
GO

-- ============================================
-- SAMPLE DATA (OPTIONAL - FOR TESTING)
-- ============================================

-- Insert sample customer
-- INSERT INTO [dbo].[Customers] 
-- ([Email], [Name], [Phone], [Age], [EmergencyContact])
-- VALUES ('john@example.com', 'John Doe', '9876543210', 35, 'Jane Doe');

-- PRINT 'Database schema created successfully!';
