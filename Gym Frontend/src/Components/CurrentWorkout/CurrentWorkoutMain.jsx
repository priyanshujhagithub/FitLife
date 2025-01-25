import React, { useState } from "react";
import { Outlet } from "react-router-dom";

function CurrentWorkoutMain() {
    const [currExercises, handleExercises] = useState({ "Chest Press": [ {sno: "1", reps: "10", weight: "10"} ] });
    const [value, setValue] = useState("");
    const [selectedMuscleGroup,setSelectedMuscleGroup]=useState([]);
    function addNewSet(newSetDetails, exerciseName) {
        handleExercises((prev) => {
            return {
                ...prev,
                [exerciseName]: [
                    ...(prev[exerciseName]),
                    {
                        sno: prev[exerciseName].length+ 1,
                        reps: newSetDetails.reps,
                        weight: newSetDetails.weight
                    }
                ]
            };
        }
        )
    };
    function addNewExerciseCard(exerciseName) {
        setSelectedMuscleGroup([...selectedMuscleGroup,...exerciseName.muscleGrp]);
        console.log(selectedMuscleGroup);
        handleExercises({...currExercises,[exerciseName.name]:[]});
    }
    return (
        <div>

        <Outlet
            context={{value:value,setValue:setValue,addNewExerciseCard:addNewExerciseCard,addNewSet:addNewSet,currExercises:currExercises,selectedMuscleGroup:selectedMuscleGroup}}

        />
        </div>
    );
}

export default CurrentWorkoutMain;
