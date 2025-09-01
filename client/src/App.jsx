import { BrowserRouter, Route, Routes } from "react-router-dom"
import CurrentWorkoutPage from "./pages/CurrentWorkoutPage.jsx"
import NewExercisePage from "./pages/NewExercisePage.jsx"
import CurrentWorkoutMain from "./pages/CurrentWorkoutMain.jsx"
import SignIn from "./pages/Login.jsx"
import { AuthProvider } from "./hooks/useAuth.jsx"
import { ProtectedRoute } from "./components/common/protected-route.jsx"
import SignUp from "./pages/SignUp.jsx"
import Home from "./pages/Home.jsx"
import LandingPage from "./pages/LandingPage.jsx"

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
