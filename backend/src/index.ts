import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { connectDB } from "./db";

connectDB()

const app = express();
app.use(bodyParser.json());

const PORT: number = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('This is my server using TypeScript syntax');
});

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
