import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import todoRouter from './routes/todoRoute.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const DBURI = process.env.DATABSE_URL;
// console.log(DBURI);
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(DBURI)
.then(() => 
    console.log('Connected to database')).
    catch((error) => 
    console.log('Error connecting to database', error));


app.use('/api', todoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
