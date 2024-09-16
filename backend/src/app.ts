import express, { Application, Request, Response } from 'express';
import dotenv from "dotenv";
import Routes from './routes';
import cors from 'cors';

dotenv.config();

const app: Application = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));

app.use(express.json());

app.use('/api', Routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
