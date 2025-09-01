import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth.jsx"
import { Button } from "../components/common/button.jsx"
import { Card, CardContent, CardHeader, CardTitle } from "../components/common/card.jsx"
import { Calendar, Clock, Target, TrendingUp, Play, LogOut, ArrowLeft, Trash2, AlertTriangle, CheckCircle } from "lucide-react"
import axios from "axios"
import { API_ENDPOINTS } from "../config/api.js"

export default function Home() {
  const navigate = useNavigate()
  const { signOut, user } = useAuth()
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingSession, setDeletingSession] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate("/", { replace: true })
  }

  const fetchSessions = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.EXERCISES.MY, {
        withCredentials: true,
      })
      setSessions(response.data.exercises)
    } catch (error) {
      console.error("Failed to fetch sessions", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) fetchSessions()
  }, [user])

  const handleDeleteSession = async (sessionId) => {
    try {
      setDeletingSession(sessionId)
      
      const response = await axios.delete(API_ENDPOINTS.EXERCISES.DELETE(sessionId), {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      setSessions(prev => prev.filter(session => session._id !== sessionId))
      setShowDeleteConfirm(null)
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)
    } catch (error) {
      console.error("Failed to delete session", error)
      
      let errorMessage = "Failed to delete session. Please try again."
      if (error.response?.status === 404) {
        errorMessage = "Session not found. It may have already been deleted."
      } else if (error.response?.status === 401) {
        errorMessage = "Authentication failed. Please log in again."
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      }
      
      alert(errorMessage)
    } finally {
      setDeletingSession(null)
    }
  }

  const confirmDelete = (sessionId) => {
    setShowDeleteConfirm(sessionId)
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(null)
  }

  const metrics = [
    {
      value: sessions.length,
      label: "Total Workouts",
      icon: <Target className="h-6 w-6" />,
    },
    {
      value: sessions.reduce((total, session) => {
        return total + Object.keys(session.data || {}).length
      }, 0),
      label: "Exercises Completed",
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      value: sessions.reduce((total, session) => {
        const duration = parseInt(session.sessionConfig?.duration || 0, 10);
        return total + duration;
      }, 0),
      label: "Minutes Trained",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      value: new Set(sessions.flatMap((session) => Object.keys(session.data || {}))).size,
      label: "Unique Exercises",
      icon: <Calendar className="h-6 w-6" />,
    },
  ]

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url('/images/home.jpg')`,
      }}
    >
      {/* Navigation */}
      <nav className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16 relative">
            {/* Left side-back to home */}
            <div>
              <Button
                onClick={() => navigate("/")}
                variant="ghost"
                className="text-white hover:text-red-400"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
            {/* Right side-sign out */}
            <div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-red-400 hover:text-red-400 bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Session deleted successfully!</span>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            Welcome Back, <span className="text-red-500">Champion!</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 animate-fade-in-delay">
            Ready to crush your next workout? Let's make today count.
          </p>
          <Button
            onClick={() => navigate("/newSession")}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300 animate-fade-in-delay-2"
          >
            <Play className="h-5 w-5 mr-2" />
            Start New Workout
          </Button>
        </div>

        {/* Metrics panel */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Your Fitness Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <Card
                key={index}
                className="bg-gray-900/90 backdrop-blur-sm border-gray-700 hover:border-red-500 text-center hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-red-500 mb-2">{metric.value}</div>
                  <div className="text-gray-500 font-medium">{metric.label}</div>
                  {metric.icon && <div className="mt-3 text-red-500">{metric.icon}</div>}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Previous sessions */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Your Workout History</h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
              <p className="text-gray-300 mt-4">Loading your sessions...</p>
            </div>
          ) : sessions.length === 0 ? (
            <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-700 text-center py-12">
              <CardContent>
                <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No workouts yet</h3>
                <p className="text-gray-400 mb-6">Start your first workout session to see your progress here!</p>
                <Button onClick={() => navigate("/newSession")} className="bg-red-600 hover:bg-red-700 text-white">
                  <Play className="h-4 w-4 mr-2" />
                  Start Your First Workout
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sessions.map((session, idx) => (
                <Card
                  key={idx}
                  className="bg-gray-900/90 backdrop-blur-sm border-gray-700 hover:border-red-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-slide-up relative"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Delete Button */}
                  <button
                    onClick={() => confirmDelete(session._id)}
                    className="absolute top-3 right-3 p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 rounded-full hover:bg-red-500/10"
                    title="Delete session"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-red-500 pr-8">
                      {session.sessionConfig?.sessionName || "Workout Session"}
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      {new Date(session.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Type:</span>
                      <span className="font-medium text-gray-500 capitalize">
                        {session.sessionConfig?.workoutType || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-medium text-gray-500">
                        {session.sessionConfig?.duration ? `${session.sessionConfig.duration} min` : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Exercises:</span>
                      <span className="font-medium text-gray-500">{Object.keys(session.data || {}).length}</span>
                    </div>
                    {Object.keys(session.data || {}).length > 0 && (
                      <div className="pt-2 border-t border-gray-700">
                        <p className="text-xs text-gray-400 mb-1">Exercises:</p>
                        <div className="flex flex-wrap gap-1">
                          {Object.keys(session.data || {})
                            .slice(0, 3)
                            .map((exercise, i) => (
                              <span
                                key={i}
                                className="inline-block bg-red-500/20 text-red-500 text-xs px-2 py-1 rounded-full border border-red-500/30"
                              >
                                {exercise}
                              </span>
                            ))}
                          {Object.keys(session.data || {}).length > 3 && (
                            <span className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                              +{Object.keys(session.data || {}).length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>

                  {/* Delete Confirmation Dialog */}
                  {showDeleteConfirm === session._id && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-sm mx-4">
                        <div className="flex items-center mb-4">
                          <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
                          <h3 className="text-lg font-semibold text-white">Delete Session</h3>
                        </div>
                        <p className="text-gray-300 mb-6">
                          Are you sure you want to delete this workout session? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                          <Button
                            onClick={() => handleDeleteSession(session._id)}
                            disabled={deletingSession === session._id}
                            className="bg-red-600 hover:bg-red-700 text-white flex-1"
                          >
                            {deletingSession === session._id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mx-auto"></div>
                            ) : (
                              "Delete"
                            )}
                          </Button>
                          <Button
                            onClick={cancelDelete}
                            variant="outline"
                            className="border-gray-600 text-gray-300 hover:bg-gray-700 flex-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
