import express from 'express'
import exerciseData from './exerciseData.js';
import cors from 'cors';
const app=express();
const port=process.env.port||5000;

app.use(cors())
app.get('/',(req,res)=>{
    res.json(exerciseData)
})


app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})