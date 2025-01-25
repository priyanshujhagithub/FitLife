import React,{useState,useEffect} from "react";
import NewExercise from "./Searchable";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";



function NewExercisePage(props) {
    const { value, setValue, addNewExerciseCard } = useOutletContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    useEffect(()=>{
        async function fetchData(){
            setLoading(true);
            try{
                const response=await axios.get("http://localhost:5000/");
                setData(response.data);
            }catch(error){
                console.log(error);
            }
            setLoading(false);
        }
        fetchData();

    },[]);
    console.log(data)
    return (
        <div>
            <button onClick={
                () => { navigate(-1); }
            }>Go back</button>
            <NewExercise
                options={data||[]}
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
