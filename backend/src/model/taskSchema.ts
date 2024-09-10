import { Schema, model, Document, Types } from 'mongoose';

export type TaskDocument = {
    task: string;
    date: Date;
    user: Types.ObjectId; // Use Types.ObjectId for the user field
}

const TaskSchema = new Schema<TaskDocument>({
    task: { type: String, required: true },
    date: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true } // Correctly define the user field
});

export const Task = model<TaskDocument>('Task', TaskSchema);
