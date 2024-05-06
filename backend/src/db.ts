import mongoose from 'mongoose';

const url: string = 'mongodb://localhost:27017/MyDB'; // MongoDB connection URL

// Function to connect to MongoDB using Mongoose
export async function connectDB(): Promise<void> {
    try {
        await mongoose.connect(url);

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}
