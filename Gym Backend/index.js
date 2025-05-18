import express from 'express'
import exerciseData from './exerciseData.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import authRouter from  './routes/authRoutes.js';
import exerciseRouter from './routes/exerciseRoutes.js';
import userRouter from './routes/userRoutes.js';

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
app.use('/api/exercises', exerciseRouter);
app.use('/api/users', userRouter);  

//Yeh wala hta diya hai iske jagah pe exerciserouter use ho rha hai
// app.post('/addNewExercise',(req,res)=>{
//     console.log(req.body.data);
// });

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});