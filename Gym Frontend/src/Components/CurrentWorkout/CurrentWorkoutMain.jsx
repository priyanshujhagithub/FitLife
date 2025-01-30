import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import axios from 'axios';
function CurrentWorkoutMain() {
    const [currExercises, handleExercises] = useState({ "Chest Press": [{ sno: "1", reps: "10", weight: "10" }] });
    const [value, setValue] = useState("");
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState([]);
    function endAndPostWorkoutSession() {
        const userData={
            data:currExercises
        }
        async function makePostRequest(){
            await axios.post("http://localhost:5000/addNewExercise",userData);
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
                context={{ value: value, setValue: setValue, addNewExerciseCard: addNewExerciseCard, addNewSet: addNewSet, currExercises: currExercises, selectedMuscleGroup: selectedMuscleGroup, endAndPostWorkoutSession: endAndPostWorkoutSession }}

            />
        </div>
    );
}

export default CurrentWorkoutMain;
