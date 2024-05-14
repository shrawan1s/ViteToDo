import mongoose, { Schema, Document } from 'mongoose';

// Define the type for the user document
export interface UserDocument extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

// Define the schema for the user collection
const userSchema: Schema<UserDocument> = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Create and export the User model based on the schema
export default mongoose.model<UserDocument>('User', userSchema);
