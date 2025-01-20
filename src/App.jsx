import React, { useState } from "react";
import styles from "./App.module.css";
import ExerciseCard from "./Exercisecard";
import NewExercise from "./Searchable";
import exerciseList from "./Exercise";
function App() {
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





            <NewExercise
                options={exerciseList}
                label="name"
                id="id"
                selectedVal={value}
                handleChange={(val) => setValue(val)}
                addNewExercise={addNewExerciseCard}
            />

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

export default App;
