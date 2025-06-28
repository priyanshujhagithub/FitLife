"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Button } from "../components/common/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/common/card"
import { Calendar, Clock, Target, TrendingUp, Play, LogOut, ArrowLeft } from "lucide-react"
import axios from "axios"

export default function Home() {
  const navigate = useNavigate()
  const { signOut, user } = useAuth()
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)

  const handleSignOut = async () => {
    await signOut()
    navigate("/", { replace: true })
  }

  useEffect(() => {
    async function fetchSessions() {
      try {
        const response = await axios.get("http://localhost:3001/api/exercises/my", {
          withCredentials: true,
        })
        setSessions(response.data.exercises)
      } catch (error) {
        console.error("Failed to fetch sessions", error)
      } finally {
        setLoading(false)
      }
    }
    if (user) fetchSessions()
  }, [user])

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
            {/* Left Side - Back to Home */}
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
            {/* Right Side - Sign Out */}
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

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
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

        {/* Metrics Panel */}
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

        {/* Previous Sessions */}
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
                  className="bg-gray-900/90 backdrop-blur-sm border-gray-700 hover:border-red-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-slide-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-red-500">
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
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
