"use client"

import { useState, useEffect } from "react"
import NewExercise from "../components/workout/Searchable"
import { useOutletContext } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../components/common/card"
import { Button } from "../components/common/button"
import { ArrowLeft, Dumbbell, Search, Target, TrendingUp, Activity } from "lucide-react"
import axios from "axios"

function NewExercisePage() {
  const { value, setValue, addNewExerciseCard } = useOutletContext()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const response = await axios.get("http://localhost:3001/")
        setData(response.data)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  // Add this function to handle exercise selection and redirection
  const handleExerciseSelect = (selectedExercise) => {
    // Add a small delay to ensure the exercise is added to the workout
    setTimeout(() => {
      navigate("/newSession/currentWorkout")
    }, 100)
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2)), url('/images/addexercise1.jpg')`,
      }}
    >
      {/* Navigation Bar */}
      <nav className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button onClick={() => navigate(-1)} variant="ghost" className="text-white hover:text-red-500">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Workout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Exercise Selection Card */}
        <Card className="bg-gray-900/95 backdrop-blur-sm border-gray-700 shadow-2xl animate-slide-up">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
              <Dumbbell className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-600">Exercise Library</CardTitle>
            <p className="text-gray-500 mt-2">Search and select exercises to add to your workout</p>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Loading exercise library...</p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-6">
                    Browse through <span className="text-red-500 font-semibold">{data.length}</span> available exercises
                  </p>
                </div>

                {/* Exercise Search Component */}
                <div className="max-w-md mx-auto">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-500 mb-2">Search for an exercise:</label>
                  </div>
                  <NewExercise
                    options={data || []}
                    label="name"
                    id="id"
                    selectedVal={value}
                    handleChange={(val) => setValue(val)}
                    addNewExercise={addNewExerciseCard}
                    onSelect={handleExerciseSelect}
                  />
                </div>

                {/* Exercise Categories Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="text-center p-6 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-all duration-300">
                    <div className="mx-auto w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-600 text-lg mb-2">Strength Training</h3>
                    <p className="text-sm text-gray-500">
                      Build muscle mass and increase power with resistance exercises
                    </p>
                  </div>
                  <div className="text-center p-6 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-all duration-300">
                    <div className="mx-auto w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-600 text-lg mb-2">Cardiovascular</h3>
                    <p className="text-sm text-gray-500">Improve heart health and endurance with cardio workouts</p>
                  </div>
                  <div className="text-center p-6 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-all duration-300">
                    <div className="mx-auto w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-600 text-lg mb-2">Flexibility</h3>
                    <p className="text-sm text-gray-500">Enhance mobility and prevent injury with stretching</p>
                  </div>
                </div>

                {/* Popular Exercises */}
                <div className="mt-12">
                  <h3 className="text-xl font-bold text-gray-600 mb-6 text-center">Popular Exercises</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {data.slice(0, 8).map((exercise, index) => (
                      <button
                        key={exercise.id}
                        onClick={() => {
                          setValue(exercise.name)
                          addNewExerciseCard(exercise)
                          handleExerciseSelect(exercise)
                        }}
                        className="p-3 bg-gray-800/80 border border-gray-600 rounded-lg hover:border-red-500 hover:bg-red-500/20 transition-all duration-300 text-left group"
                      >
                        <div className="text-sm font-medium text-white group-hover:text-red-500 transition-colors">
                          {exercise.name}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {exercise.muscleGrp?.length || 0} muscle groups
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-center text-sm text-gray-500 mt-8 p-4 bg-gray-600/30 rounded-lg border border-gray-700">
                  <p>
                    <span className="text-red-600">💡 Tip:</span> Can't find what you're looking for?{" "}
                    <a href="#" className="text-red-600 hover:text-red-400 underline">
                      Suggest a new exercise
                    </a>{" "}
                    and help expand our library!
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default NewExercisePage
