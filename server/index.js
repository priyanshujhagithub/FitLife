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

// CORS configuration for production
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL
].filter(Boolean);

const corsConfig = {
    credentials: true,
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
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