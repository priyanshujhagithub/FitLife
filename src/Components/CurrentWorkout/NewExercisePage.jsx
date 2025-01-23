import React from "react";
import NewExercise from "./Searchable";
import exerciseList from "./Exercise";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function NewExercisePage(props) {
    const { value, setValue, addNewExerciseCard } = useOutletContext();
    const navigate = useNavigate();
    
    return (
        <div>
            <button onClick={
                () => { navigate(-1); }
            }>Go back</button>
            <NewExercise
                options={exerciseList}
                label="name"
                id="id"
                selectedVal={value}
                handleChange={(val) => setValue(val)}
                addNewExercise={addNewExerciseCard}
            />
        </div>
    );
}

export default NewExercisePage;
