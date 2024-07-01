import { Schema, model, Document, Types } from 'mongoose';

export type NoteDocument = {
    task: string;
    date: Date;
    user: Types.ObjectId; // Use Types.ObjectId for the user field
}

const NoteSchema = new Schema<NoteDocument>({
    task: { type: String, required: true },
    date: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true } // Correctly define the user field
});

export const Note = model<NoteDocument>('Note', NoteSchema);
