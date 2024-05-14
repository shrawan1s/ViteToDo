import express, { Request, Response } from "express";
import cors from 'cors';
import { connectDB } from "./db"; // Importing database connection function
import authRouter from './routes/auth'; // Importing authentication router

// Connect to the MongoDB database
connectDB();

const app: express.Application = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies of incoming requests

const PORT: number = 3000;

// Basic route handler for the root URL
app.get('/', (req: Request, res: Response) => {
  res.send('This is my server using TypeScript syntax');
});

// Route for handling user authentication
app.use('/api/auth', authRouter);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
