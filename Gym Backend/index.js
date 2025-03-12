import express from 'express'
import exerciseData from './exerciseData.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import authRouter from  './routes/authRoutes.js'

const app=express();
const port=process.env.port||3001;
connectDB();

const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.json());

app.get('/',(req,res)=>{
    res.json(exerciseData)
});
//API Endpoints
app.use('/auth', authRouter);

app.post('/addNewExercise',(req,res)=>{
    console.log(req.body);
});

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});