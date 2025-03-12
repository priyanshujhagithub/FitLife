import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import CurrentWorkoutPage from './CurrentWorkout/CurrentWorkoutPage';
import NewExercisePage from './CurrentWorkout/NewExercisePage';
import CurrentWorkoutMain from './CurrentWorkout/CurrentWorkoutMain';
import SignIn from './Login/hooks/sign-in';
import { AuthProvider } from './Login/hooks/use-auth';
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
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/newSession" element={<CurrentWorkoutMain />}>
                        <Route path="currentWorkout" element={<CurrentWorkoutPage />} />
                        <Route path="newExercise" element={<NewExercisePage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>

    );
}

export default App;
