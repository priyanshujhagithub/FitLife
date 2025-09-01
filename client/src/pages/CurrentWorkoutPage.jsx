import ExerciseCard from "../components/workout/Exercisecard.jsx"
import HumanBody from "../components/workout/HumanBody.jsx"
import { useOutletContext,useNavigate } from "react-router"
import { Button } from "../components/common/button.jsx"
import { Card, CardContent, CardHeader, CardTitle } from "../components/common/card.jsx"
import { Plus, StopCircle, Target, Clock, Repeat, Activity, Zap, ArrowLeft } from "lucide-react"
import { useEffect } from "react"

function CurrentWorkoutPage() {
  const { addNewSet, currExercises, selectedMuscleGroup, EndAndPostWorkoutSession, sessionConfig } = useOutletContext()
  const navigate = useNavigate()

  const totalExercises = Object.keys(currExercises).length
  const totalSets = Object.values(currExercises).reduce((total, sets) => total + sets.length, 0)

  useEffect(() => {
    const exerciseCount = Object.keys(currExercises).length
    if (exerciseCount > 0) {
      console.log(`Workout updated with ${exerciseCount} exercises`)
    }
  }, [currExercises])

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/currentworkout.jpg')`,
      }}
    >
      {/* Navigation Bar */}
      <nav className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button onClick={() => navigate("/dashboard")} variant="ghost" className="text-white hover:text-red-500">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Session Config Card */}
        <Card className="mb-8 bg-gray-900/90 backdrop-blur-sm border-gray-700 shadow-2xl animate-slide-up">
          <CardHeader>
            <CardTitle className="text-xl flex items-center text-gray-600">
              <Zap className="h-5 w-5 mr-2 text-red-500" />
              Session Overview ({sessionConfig?.sessionName || "Active Workout Session"})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-2 text-red-500" />
                <div>
                  <span className="font-medium text-gray-500">Type:</span>
                  <div className="text-gray-500 capitalize">{sessionConfig?.workoutType}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Repeat className="h-4 w-4 mr-2 text-red-500" />
                <div>
                  <span className="font-medium text-gray-500">Target Reps:</span>
                  <div className="text-gray-500">{sessionConfig?.targetReps || "N/A"}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Target className="h-4 w-4 mr-2 text-red-500" />
                <div>
                  <span className="font-medium text-gray-500">Target Sets:</span>
                  <div className="text-gray-500">{sessionConfig?.targetSets || "N/A"}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-red-500" />
                <div>
                  <span className="font-medium text-gray-500">Duration:</span>
                  <div className="text-gray-500">
                    {sessionConfig?.duration ? `${sessionConfig.duration} min` : "N/A"}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-2 text-red-500" />
                <div>
                  <span className="font-medium text-gray-500">Progress:</span>
                  <div className="text-gray-500">{totalExercises} Exercises</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button
            onClick={() => navigate("/newSession/newExercise")}
            className="bg-red-600 hover:bg-red-700 text-white transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Exercise
          </Button>
          <Button
            onClick={async () => {
              await EndAndPostWorkoutSession()
            }}
            variant="outline"
            className="border-red-500 text-red-400 hover:bg-red-500/20 hover:border-red-400 transition-all duration-200 bg-transparent"
          >
            <StopCircle className="h-4 w-4 mr-2" />
            End Workout Session
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Exercises Section */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Target className="h-6 w-6 mr-2 text-red-500" />
              Your Exercises
            </h2>

            {Object.keys(currExercises).length === 0 ? (
              <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-700 animate-slide-up">
                <CardContent className="text-center py-12">
                  <Target className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready to Start?</h3>
                  <p className="text-gray-500 mb-6">Add your first exercise to begin tracking your workout!</p>
                  <Button
                    onClick={() => navigate("/newSession/newExercise")}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Exercise
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {Object.keys(currExercises).map((key, index) => (
                  <div key={key} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <ExerciseCard
                      exerciseName={key}
                      addNewSet={addNewSet}
                      sets={currExercises[key]}
                      sessionConfig={sessionConfig}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Human Body Diagram */}
          <div className="lg:col-span-1">
            <Card
              className="sticky top-4 bg-gray-900/90 backdrop-blur-sm border-gray-700 animate-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-gray-600">
                  <Activity className="h-5 w-5 mr-2 text-red-500" />
                  Muscle Groups
                </CardTitle>
                <p className="text-sm text-gray-500">Highlighted areas show targeted muscles</p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <HumanBody selected={selectedMuscleGroup || []} />
                </div>
                {selectedMuscleGroup && selectedMuscleGroup.length > 0 && (
                  <div className="mt-4 p-3 bg-red-500/20 rounded-lg border border-red-500/30">
                    <p className="text-sm font-medium text-red-500 mb-2">Active Muscle Groups:</p>
                    <div className="flex flex-wrap gap-1">
                      {[...new Set(selectedMuscleGroup)].map((muscle, i) => (
                        <span
                          key={i}
                          className="inline-block bg-red-500/30 text-red-500 text-xs px-2 py-1 rounded-full border border-red-500/40"
                        >
                          {muscle.replace("-", " ")}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWorkoutPage
