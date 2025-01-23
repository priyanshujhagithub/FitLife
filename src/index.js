import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import CurrentWorkoutDisplay from './CurrentWorkoutDisplay';
import NewExercisePage from './NewExercisePage';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate('/newSession')}>Start A Workout Session</button>
        </div>
    );
}

root.render(
    <BrowserRouter>
        <Routes>
            <Route index element={<Home />} />
            <Route path="/newSession" element={<App />}>
                <Route path="currentWorkout" element={<CurrentWorkoutDisplay/>}/>
                <Route path="newExercise" element={<NewExercisePage />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
