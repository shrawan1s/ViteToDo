import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url: string | undefined = process.env.MONGO_URI; // MongoDB connection URL

// Function to connect to MongoDB using Mongoose
export async function connectDB(): Promise<void> {
    try {
        // Connect to MongoDB using Mongoose
        await mongoose.connect(url as string);

        // Log a success message if the connection is established
        console.log('Connected to MongoDB');
    } catch (error) {
        // Log an error message if there's an issue connecting to MongoDB
        console.error('Error connecting to MongoDB:', error);
        // Throw the error to propagate it up the call stack
        throw error;
    }
}
