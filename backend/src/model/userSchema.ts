import { model, Schema, Document } from 'mongoose';

// Define the type for the user document
export type UserSchema = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    resetToken?: string;
    resetTokenExpiresAt?: Date;
};

// Define the schema for the user collection
const userSchemaDefinition: Record<keyof UserSchema, any> = {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: { type: String },
    resetTokenExpiresAt: { type: Date }
};

// Create the user schema
const userSchema = new Schema<UserSchema & Document>({
    ...userSchemaDefinition
});

// Define the user document type
export type UserDocument = UserSchema & Document;

export default model<UserDocument>('User', userSchema);
