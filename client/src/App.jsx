import { BrowserRouter, Route, Routes } from "react-router-dom"
import CurrentWorkoutPage from "./pages/CurrentWorkoutPage"
import NewExercisePage from "./pages/NewExercisePage"
import CurrentWorkoutMain from "./pages/CurrentWorkoutMain"
import SignIn from "./pages/Login"
import { AuthProvider } from "./hooks/useAuth"
import { ProtectedRoute } from "./components/common/protected-route"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import LandingPage from "./pages/LandingPage"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/newSession"
            element={
              <ProtectedRoute>
                <CurrentWorkoutMain />
              </ProtectedRoute>
            }
          >
            <Route
              path="currentWorkout"
              element={
                <ProtectedRoute>
                  <CurrentWorkoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="newExercise"
              element={
                <ProtectedRoute>
                  <NewExercisePage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
