import express, { Request, Response } from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import {refreralCtrollers} from './src/controllers/referel.controller'
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:'*'}))
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express App!');
});

app.post('/createreferel',refreralCtrollers)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


