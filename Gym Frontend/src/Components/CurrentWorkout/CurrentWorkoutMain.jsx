import React, { useState } from "react";
import { Outlet } from "react-router-dom";

function CurrentWorkoutMain() {
    const [currExercises, handleExercises] = useState({ "Chest Press": [ {sno: "1", reps: "10", weight: "10"} ] });
    const [value, setValue] = useState("");
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
        console.log(exerciseName);
        handleExercises({...currExercises,[exerciseName]:[]});
    }
    return (
        <div>

        <Outlet
            context={{value:value,setValue:setValue,addNewExerciseCard:addNewExerciseCard,addNewSet:addNewSet,currExercises:currExercises}}

        />
        </div>
    );
}

export default CurrentWorkoutMain;
