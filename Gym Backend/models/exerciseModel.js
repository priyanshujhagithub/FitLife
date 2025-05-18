import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true
    },
    name:{
        type:String,
        required:true
    },
    muscleGroup:{
        type:Number,
        required:true
    },
    sets:{
        type:Number,
        default:3
    },
    reps:{
        type:Number,
        default:10
    },
    weight:{
        type:Number,
        default:0
    },
    duration:{
        type:Number,
        default:0
    },
    date:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true
});

const excerciseModel=mongoose.models.Exercise || mongoose.model('Exercise',exerciseSchema);

export default excerciseModel;