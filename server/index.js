import express from 'express'
import exerciseData from './exerciseData.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import authRouter from  './routes/authRoutes.js';
import exerciseRouter from './routes/exerciseRoutes.js';

const app=express();
const port=process.env.PORT||3001;
connectDB();

const corsConfig = {
    credentials: true,
    origin: 'https://fitlifepj.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.json());

app.get('/list',(req,res)=>{
    res.json(exerciseData)
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.use('/auth', authRouter);
app.use('/api/exercises', exerciseRouter);  

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});