"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Input } from "../components/common/input"
import { Button } from "../components/common/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/common/card"
import { LogIn, ArrowLeft } from "lucide-react"
import { z, ZodError } from "zod"

const signInSchema = z.object({
  email: z.string().email("Invalid email Address"),
  password: z.string().min(1, "Password is required"),
})

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const { signIn, user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || "/dashboard"
      navigate(from, { replace: true })
    }
  }, [user, navigate, location])

  const handleSubmit = async (data) => {
    try {
      setErrors({})
      setIsSubmitting(true)
      const validatedData = signInSchema.parse(data)
      await signIn(validatedData.email, validatedData.password)

      // Navigate to the intended destination or dashboard
      const from = location.state?.from?.pathname || "/dashboard"
      navigate(from, { replace: true })
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = {}
        error.errors.forEach((err) => {
          if (err.path) {
            formattedErrors[err.path[0]] = err.message
          }
        })
        setErrors(formattedErrors)
      } else {
        // Provide more specific error messages
        const errorMessage = error.message || "Sign in failed. Please check your credentials and try again."
        setErrors({ submit: errorMessage })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  // Don't render the form if user is already authenticated
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <div className="text-white">Redirecting...</div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('/images/login.jpg')`,
      }}
    >
      {/* Back to Landing Button */}
      <Button
        onClick={() => navigate("/")}
        variant="ghost"
        className="absolute top-4 left-4 text-white hover:text-red-400 z-10"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Button>

      <div className="w-full max-w-md px-4">
        <Card className="bg-gray-900/95 backdrop-blur-sm border-gray-700 shadow-2xl animate-slide-up">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
              <LogIn className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-700">Welcome Back</CardTitle>
            <p className="text-gray-500 mt-2">Sign in to continue your fitness journey</p>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(formData)
              }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-400">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className={`bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 transition-all duration-200 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-400">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className={`bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 transition-all duration-200 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                {errors.password && <p className="text-sm text-red-400">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-600 bg-gray-800 text-red-600 focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-400">Remember me</span>
                </label>
                <a href="#" className="text-sm text-red-400 hover:text-red-300 transition-colors">
                  Forgot password?
                </a>
              </div>

              {errors.submit && (
                <div className="bg-red-900/50 border border-red-500 rounded-md p-3">
                  <p className="text-sm text-red-300 text-center">{errors.submit}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 font-semibold transform hover:scale-105 transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  <>
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign In
                  </>
                )}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    className="text-red-400 hover:text-red-300 font-medium transition-colors duration-200"
                  >
                    Create one now
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
