import React, { useState } from "react";
import ExerciseCard from "./Exercisecard";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function CurrentWorkoutPage(props) {
    const { addNewSet, currExercises } = useOutletContext();
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={
                () => { navigate('/newSession/newExercise'); }
            }>Add New Exercise</button>
            {Object.keys(currExercises).map((key) => {
                return (<ExerciseCard
                    exerciseName={key}
                    addNewSet={addNewSet}
                    sets={currExercises[key]}
                />);
            })}
        </div>
    );
}

export default CurrentWorkoutPage;
