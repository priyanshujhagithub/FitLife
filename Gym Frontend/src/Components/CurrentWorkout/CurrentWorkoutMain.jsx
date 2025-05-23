import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../Login/hooks/use-auth";
function CurrentWorkoutMain() {
    const [currExercises, handleExercises] = useState({ "Chest Press": [{ sno: "1", reps: "10", weight: "10" }] });
    const [value, setValue] = useState("");
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState([]);
    const {user}=useAuth();
    async function EndAndPostWorkoutSession() {
        
        async function makePostRequest(){
            try{
                const userData={
            user:user,
            data:currExercises
        }
                await axios.post("http://localhost:3001/api/exercises/add",userData);
            }catch(e){
                console.log(e);
            }
        }
        makePostRequest();
    }
    function addNewSet(newSetDetails, exerciseName) {
        handleExercises((prev) => {
            return {
                ...prev,
                [exerciseName]: [
                    ...(prev[exerciseName]),
                    {
                        sno: prev[exerciseName].length + 1,
                        reps: newSetDetails.reps,
                        weight: newSetDetails.weight
                    }
                ]
            };
        }
        )
    };
    function addNewExerciseCard(exerciseName) {
        setSelectedMuscleGroup([...selectedMuscleGroup, ...exerciseName.muscleGrp]);
        console.log(selectedMuscleGroup);
        handleExercises({ ...currExercises, [exerciseName.name]: [] });
    }
    return (
        <div>

            <Outlet
                context={{ value: value, setValue: setValue, addNewExerciseCard: addNewExerciseCard, addNewSet: addNewSet, currExercises: currExercises, selectedMuscleGroup: selectedMuscleGroup, EndAndPostWorkoutSession: EndAndPostWorkoutSession }}

            />
        </div>
    );
}

export default CurrentWorkoutMain;
