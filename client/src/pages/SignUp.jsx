import { useState } from "react"
import { useAuth } from "../hooks/useAuth.jsx"
import { Input } from "../components/common/input.jsx"
import { Button } from "../components/common/button.jsx"
import { Card, CardContent, CardHeader, CardTitle } from "../components/common/card.jsx"
import { UserPlus, CheckCircle, ArrowLeft } from "lucide-react"
import { z, ZodError } from "zod"
import { useNavigate } from "react-router"

const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  name: z.string().optional(),
})

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const { signUp } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (data) => {
    try {
      setErrors({})
      setIsSubmitting(true)
      const validatedData = signUpSchema.parse(data)
      await signUp(validatedData.email, validatedData.password, validatedData.name)
      navigate("/dashboard", { replace: true })
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
        const errorMessage = error.message || "Sign up failed. Please try again."
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

  const passwordChecks = [
    { label: "At least 8 characters", test: (pwd) => pwd.length >= 8 },
    { label: "One uppercase letter", test: (pwd) => /[A-Z]/.test(pwd) },
    { label: "One lowercase letter", test: (pwd) => /[a-z]/.test(pwd) },
    { label: "One number", test: (pwd) => /[0-9]/.test(pwd) },
  ]

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative py-12"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('/images/signup.jpg')`,
      }}
    >
      {/* Back to Landing Button */}
      <Button
        onClick={() => navigate("/")}
        variant="ghost"
        className="absolute top-4 left-4 text-white hover:text-red-500 z-10"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Button>

      <div className="w-full max-w-md px-4">
        <Card className="bg-gray-900/95 backdrop-blur-sm border-gray-700 shadow-2xl animate-slide-up">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-600">Join FitTracker</CardTitle>
            <p className="text-gray-500 mt-2">Start your fitness transformation today</p>
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
                <label htmlFor="name" className="text-sm font-medium text-gray-500">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 transition-all duration-200"
                />
                {errors.name && <p className="text-sm text-red-400">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-500">
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
                <label htmlFor="password" className="text-sm font-medium text-gray-500">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a strong password"
                  className={`bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 transition-all duration-200 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                {errors.password && <p className="text-sm text-red-400">{errors.password}</p>}

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-medium text-gray-400">Password Requirements:</p>
                    <div className="space-y-1">
                      {passwordChecks.map((check, index) => (
                        <div key={index} className="flex items-center text-xs">
                          <CheckCircle
                            className={`h-3 w-3 mr-2 ${
                              check.test(formData.password) ? "text-green-500" : "text-gray-500"
                            }`}
                          />
                          <span className={check.test(formData.password) ? "text-green-500" : "text-gray-400"}>
                            {check.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  required
                  className="rounded border-gray-600 bg-gray-800 text-red-600 focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-500">
                  I agree to the{" "}
                  <a href="#" className="text-red-500 hover:text-red-300">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-red-500 hover:text-red-300">
                    Privacy Policy
                  </a>
                </span>
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
                    Creating Account...
                  </div>
                ) : (
                  <>
                    <UserPlus className="h-5 w-5 mr-2" />
                    Create Account
                  </>
                )}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/signin")}
                    className="text-red-500 hover:text-red-300 font-medium transition-colors duration-200"
                  >
                    Sign in here
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
