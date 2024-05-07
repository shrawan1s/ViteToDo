import express, { Request, Response } from "express";
import cors from 'cors';
import { connectDB } from "./db";
import authRouter from './routes/auth';

connectDB()

const app = express();
app.use(cors());
app.use(express.json());

const PORT: number = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('This is my server using TypeScript syntax');
});

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
