import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import all models
import Customer from './models/Customer.js';
import Trip from './models/Trip.js';
import TransportBooking from './models/TransportBooking.js';
import AccommodationBooking from './models/AccommodationBooking.js';
import Payment from './models/Payment.js';

// Load environment variables
dotenv.config();

const initializeDatabase = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/new_TravelCo';

        console.log('🔄 Connecting to MongoDB...');
        console.log(`📍 URI: ${mongoUri}`);

        await mongoose.connect(mongoUri);

        console.log('✅ MongoDB Connected Successfully');
        console.log(`📊 Database: new_TravelCo`);

        // Get database instance
        const db = mongoose.connection.db;

        // List existing collections
        const collections = await db.listCollections().toArray();
        console.log('\n📋 Existing Collections:');
        if (collections.length === 0) {
            console.log('   (none - database is new)');
        } else {
            collections.forEach(col => console.log(`   - ${col.name}`));
        }

        // Create collections by ensuring indexes (this creates the collections if they don't exist)
        console.log('\n🔨 Initializing Collections...');

        await Customer.createIndexes();
        console.log('   ✓ customers collection initialized');

        await Trip.createIndexes();
        console.log('   ✓ trips collection initialized');

        await TransportBooking.createIndexes();
        console.log('   ✓ transportbookings collection initialized');

        await AccommodationBooking.createIndexes();
        console.log('   ✓ accommodationbookings collection initialized');

        await Payment.createIndexes();
        console.log('   ✓ payments collection initialized');

        // Verify collections were created
        const newCollections = await db.listCollections().toArray();
        console.log('\n✅ Database Initialized Successfully!');
        console.log('\n📋 All Collections in new_TravelCo:');
        newCollections.forEach(col => console.log(`   - ${col.name}`));

        console.log('\n🎉 Database "new_TravelCo" is ready to use!');
        console.log('💡 You can now start your server with: npm start\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Database Initialization Error:', error);
        process.exit(1);
    }
};

initializeDatabase();
