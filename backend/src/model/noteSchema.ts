import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import { UserDocument } from './userSchema';

// Define the type for the note document
export type NoteSchema = {
    userId: ObjectId | UserDocument;
    note: string;
};

// Define the schema for the note collection
const noteSchemaDefinition: Record<keyof NoteSchema, any> = {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    note: { type: String, required: true }
};

// Create the note schema
const noteSchema = new Schema<NoteSchema & Document>({
    ...noteSchemaDefinition
});

// Define the note document type
export type NoteDocument = NoteSchema & Document;

export default mongoose.model<NoteDocument>('Note', noteSchema);
