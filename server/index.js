import express from 'express'
import exerciseData from './exerciseData.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import authRouter from  './routes/authRoutes.js';
import exerciseRouter from './routes/exerciseRoutes.js';
// import userRouter from './routes/userRoutes.js';

const app=express();
const port=process.env.PORT||3001;
connectDB();

// Simplified CORS configuration for easier deployment
const corsConfig = {
    credentials: true,
    origin: process.env.CLIENT_URL || true, // Allow specific origin or all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.json());

app.get('/',(req,res)=>{
    res.json(exerciseData)
});

// Health check endpoint for deployment
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

//API Endpoints
app.use('/auth', authRouter);
app.use('/api/exercises', exerciseRouter);
// app.use('/api/users', userRouter);  

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});