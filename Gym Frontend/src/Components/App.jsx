import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import CurrentWorkoutPage from './CurrentWorkout/CurrentWorkoutPage';
import NewExercisePage from './CurrentWorkout/NewExercisePage';
import CurrentWorkoutMain from './CurrentWorkout/CurrentWorkoutMain';
import SignIn from './Login/sign-in';
import { AuthProvider } from './Login/hooks/use-auth';
import { ProtectedRoute } from './Login/protected-route';
import SignUp from './Login/sign-up';
import Home from './home';
function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="signup" element={<SignUp/>}/>
                    <Route index element={
                        <ProtectedRoute><Home /></ProtectedRoute>
                    } />
                    <Route path="/newSession" element={
                        <ProtectedRoute><CurrentWorkoutMain /></ProtectedRoute>}>
                        <Route path="currentWorkout" element={<ProtectedRoute><CurrentWorkoutPage /></ProtectedRoute>} />
                        <Route path="newExercise" element={<ProtectedRoute><NewExercisePage /></ProtectedRoute>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>

    );
}

export default App;
