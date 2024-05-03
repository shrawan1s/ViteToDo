import { MongoClient, Db } from 'mongodb';

const url: string = 'mongodb://localhost:27017'; // MongoDB connection URL
const dbName: string = 'MyDB'; // Change this to your database name

let db: Db; // Database connection object

// Function to connect to MongoDB
export async function connectDB(): Promise<void> {
    try {
        // Connect to MongoDB with options
        const client: MongoClient = await MongoClient.connect(url);
        
        // Access the database
        db = client.db(dbName);

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

// Function to get the database connection
export function getDB(): Db {
    if (!db) {
        throw new Error('Database connection not initialized. Call connectDB first.');
    }
    return db;
}

