import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/common/button.jsx"
import { Input } from "../components/common/input.jsx"
import { Card, CardContent, CardHeader, CardTitle } from "../components/common/card.jsx"
import { Play, ArrowLeft, Target, Clock, Repeat, Activity } from "lucide-react"

function NewSessionSetup({ setSessionConfig }) {
  const navigate = useNavigate()

  const [sessionData, setSessionData] = useState({
    sessionName: "",
    targetReps: "",
    targetSets: "",
    workoutType: "strength",
    duration: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSessionData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleStartSession = () => {
    setSessionConfig(sessionData)
    navigate("/newSession/currentWorkout")
  }

  const workoutTypes = [
    { value: "strength", label: "Strength Training", icon: "💪" },
    { value: "cardio", label: "Cardio", icon: "❤️" },
    { value: "flexibility", label: "Flexibility", icon: "🧘" },
    { value: "mixed", label: "Mixed", icon: "🔥" },
  ]

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/newsession.jpg')`,
      }}
    >
      {/* Back Button */}
      <Button
        onClick={() => navigate("/")}
        variant="ghost"
        className="absolute top-4 left-4 text-white hover:text-red-400 z-10"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      <div className="w-full max-w-lg px-4">
        <Card className="bg-gray-900/95 backdrop-blur-sm border-gray-700 shadow-2xl animate-slide-up">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
              <Activity className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-600">New Workout Session</CardTitle>
            <p className="text-gray-500 mt-2">Configure your workout parameters</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="sessionName" className="text-sm font-medium text-gray-500 flex items-center">
                  <Target className="h-4 w-4 mr-2 text-red-500" />
                  Session Name
                </label>
                <Input
                  id="sessionName"
                  name="sessionName"
                  type="text"
                  value={sessionData.sessionName}
                  onChange={handleInputChange}
                  placeholder="e.g., Upper Body Blast, Leg Day, Full Body"
                  required
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 transition-all duration-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="targetReps" className="text-sm font-medium text-gray-500 flex items-center">
                    <Repeat className="h-4 w-4 mr-2 text-red-500" />
                    Target Reps
                  </label>
                  <Input
                    id="targetReps"
                    name="targetReps"
                    type="number"
                    value={sessionData.targetReps}
                    onChange={handleInputChange}
                    placeholder="12"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="targetSets" className="text-sm font-medium text-gray-500 flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-red-500" />
                    Target Sets
                  </label>
                  <Input
                    id="targetSets"
                    name="targetSets"
                    type="number"
                    value={sessionData.targetSets}
                    onChange={handleInputChange}
                    placeholder="3"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="workoutType" className="text-sm font-medium text-gray-500">
                  Workout Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {workoutTypes.map((type) => (
                    <label
                      key={type.value}
                      className={`relative flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                        sessionData.workoutType === type.value
                          ? "border-red-500 bg-red-500/20 text-red-500"
                          : "border-gray-600 bg-gray-800 text-gray-300 hover:border-red-400 hover:bg-red-500/10"
                      }`}
                    >
                      <input
                        type="radio"
                        name="workoutType"
                        value={type.value}
                        checked={sessionData.workoutType === type.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span className="text-lg mr-2">{type.icon}</span>
                      <span className="text-sm font-medium">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="duration" className="text-sm font-medium text-gray-500 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-red-500" />
                  Duration (minutes)
                </label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  value={sessionData.duration}
                  onChange={handleInputChange}
                  placeholder="60"
                  min="1"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 transition-all duration-200"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  onClick={handleStartSession}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 font-semibold transform hover:scale-105 transition-all duration-300"
                  disabled={!sessionData.sessionName}
                >
                  <Play className="h-5 w-5 mr-4" />
                  Start Workout Session
                </Button>
                <Button
                  type="button"
                  onClick={() => navigate("/")}
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-gray-300 hover:border-gray-500 py-3 transition-all duration-200"
                >
                  <ArrowLeft className="h-5 w-5 mr-4" />
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default NewSessionSetup
