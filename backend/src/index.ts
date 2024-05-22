import express, { Request, Response } from "express";
import cors from 'cors';
import { connectDB } from "./db";
import authRouter from './routes/auth';
import dotenv from 'dotenv';

dotenv.config();

const port: number = parseInt(process.env.PORT || '3000', 10);

connectDB();

const app: express.Application = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('This is my server using TypeScript syntax');
});

app.use('/api/auth', authRouter);

app.listen(port as number, () => {
  console.log(`Server is running on Port ${port}`);
});
