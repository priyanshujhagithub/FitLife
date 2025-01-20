import React,{useState} from "react";

//exercise object is {name:"",set:[]}

//props will contain exercise obect we will just new set to 
function ExerciseCard(props){   
    const [newSet, setNewSet] = useState(false)
    const [newSetDetails, setNewSetDetails] = useState({ reps: "", weight: "" });


    function handleNewSet(event) {
        props.addNewSet(newSetDetails,props.exerciseName);
        setNewSetDetails({reps:"",weight:""});
        setNewSet(false);
        event.preventDefault();
    }
    function handleOnClick(props) {
        setNewSet(true);
    }
    function handleOnChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setNewSetDetails({ ...newSetDetails, [name]: value });

    }
    
    return (
        <div>
            <div>
                <div>
                    <h2>{props.exerciseName}</h2>
                    <ul>
                        {props.sets.map((set) => (
                            <li key={set.sno}>
                                Set {set.sno}: {set.reps} reps, {set.weight}
                            </li>
                        ))}
                    </ul>
                    {newSet && <form onSubmit={handleNewSet}>
                        <label>reps:
                            <input name="reps"
                                onChange={handleOnChange} value={newSetDetails.reps} type="text" />
                        </label>
                        <label>weight:
                            <input
                                name="weight"
                                onChange={handleOnChange}
                                value={newSetDetails.weight}
                                type="text" />
                        </label>
                        <button type="submit">+</button>
                    </form>}
                    <button onClick={handleOnClick}>set</button>
                </div>
            </div>
        </div>
    );
}


export default ExerciseCard;