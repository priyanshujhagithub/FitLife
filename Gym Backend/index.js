import express from 'express'
import exerciseData from './exerciseData.js';
import cors from 'cors';
const app=express();
const port=process.env.port||5000;

app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    res.json(exerciseData)
})
app.post('/addNewExercise',(req,res)=>{
    console.log(req.body);
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})