import React, { useState } from "react";
import {useNavigate, Outlet } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import NewSessionSetup from './NewSessionSetup';

function CurrentWorkoutMain() {
    const navigate=useNavigate();
    const [currExercises, handleExercises] = useState({});
    const [value, setValue] = useState("");
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState([]);
    const [sessionConfig, setSessionConfig] = useState(null);
    const {user}=useAuth();

    async function EndAndPostWorkoutSession() {
        try{
            const userData={
                user:user,
                data:currExercises,
                sessionConfig: sessionConfig
            }
            await axios.post("http://localhost:3001/api/exercises/add",userData,{withCredentials:true});
            navigate('/');
        }catch(e){
            console.log(e);
        }
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
        })
    };

    function addNewExerciseCard(exerciseName) {
        setSelectedMuscleGroup([...selectedMuscleGroup, ...exerciseName.muscleGrp]);
        console.log(selectedMuscleGroup);
        handleExercises({ ...currExercises, [exerciseName.name]: [] });
    }

    if (!sessionConfig) {
        return <NewSessionSetup setSessionConfig={setSessionConfig} />;
    }

    return (
        <div>
            <Outlet
                context={{ 
                    value: value, 
                    setValue: setValue, 
                    addNewExerciseCard: addNewExerciseCard, 
                    addNewSet: addNewSet, 
                    currExercises: currExercises, 
                    selectedMuscleGroup: selectedMuscleGroup, 
                    EndAndPostWorkoutSession: EndAndPostWorkoutSession,
                    sessionConfig: sessionConfig,
                    setSessionConfig: setSessionConfig
                }}
            />
        </div>
    );
}

export default CurrentWorkoutMain;
