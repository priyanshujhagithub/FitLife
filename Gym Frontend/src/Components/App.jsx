import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import CurrentWorkoutPage from './CurrentWorkout/CurrentWorkoutPage';
import NewExercisePage from './CurrentWorkout/NewExercisePage';
import CurrentWorkoutMain from './CurrentWorkout/CurrentWorkoutMain';
function App() {
    function Home() {
        const navigate = useNavigate();

        return (
            <div>
                <button onClick={() => navigate('/newSession')}>Start A Workout Session</button>
            </div>
        );
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/newSession" element={<CurrentWorkoutMain />}>
                    <Route path="currentWorkout" element={<CurrentWorkoutPage />} />
                    <Route path="newExercise" element={<NewExercisePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
