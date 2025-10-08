if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

import mongoose from 'mongoose';

async function wipeDatabase() {
    try {
        const dbUrl = process.env.DB_URL || "";
        
        if (!dbUrl) {
            console.error("❌ DB_URL is not defined in environment variables");
            process.exit(1);
        }

        console.log("🗑️  Connecting to MongoDB...");
        
        mongoose.set('strictQuery', true);
        await mongoose.connect(dbUrl, {
            //@ts-ignore
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("✅ Connected to MongoDB");
        
        // Get all collections
        const collections = await mongoose.connection.db.collections();
        
        if (collections.length === 0) {
            console.log("📭 No collections found. Database is already empty.");
        } else {
            console.log(`🔍 Found ${collections.length} collection(s)`);
            
            // Drop each collection
            for (const collection of collections) {
                await collection.drop();
                console.log(`   ✓ Dropped collection: ${collection.collectionName}`);
            }
            
            console.log("🎉 All collections have been wiped!");
        }
        
        await mongoose.connection.close();
        console.log("👋 Disconnected from MongoDB");
        process.exit(0);
        
    } catch (error) {
        console.error("❌ Error wiping database:", error);
        await mongoose.connection.close();
        process.exit(1);
    }
}

wipeDatabase();

