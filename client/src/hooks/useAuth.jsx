import { createContext, useState, useEffect, useContext } from "react"
import axios from "axios"
import { API_ENDPOINTS } from "../config/api.js"

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await axios.post(
        API_ENDPOINTS.AUTH.ME,
        {},
        {
          withCredentials: true,
        },
      )
      if (response.data.user) {
        setUser(response.data.user)
      } else {
        setUser(null)
      }
    } catch (e) {
      console.log("Auth check failed:", e)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const signIn = async (email, password) => {
    try {
      const response = await axios.post(
        API_ENDPOINTS.AUTH.LOGIN,
        {
          email: email,
          password: password,
        },
        { withCredentials: true },
      )

      if (!response.data.success) {
        const error = response.data.message || "Failed to sign in"
        throw new Error(error)
      }

      setUser(response.data.id)
      return response.data
    } catch (error) {
      if (error.response) {
        const message = error.response.data?.message || "Invalid credentials"
        throw new Error(message)
      } else if (error.request) {
        throw new Error("Network error. Please check your connection.")
      } else {
        throw new Error(error.message || "Sign in failed")
      }
    }
  }

  const signUp = async (email, password, name) => {
    try {
      const response = await axios.post(
        API_ENDPOINTS.AUTH.REGISTER,
        {
          name: name,
          email: email,
          password: password,
        },
        { withCredentials: true },
      )

      if (!response.data.success) {
        const error = response.data.message || "Failed to sign up"
        throw new Error(error)
      }

      setUser(response.data.id)
      return response.data
    } catch (error) {
      if (error.response) {
        const message = error.response.data?.message || "Registration failed"
        throw new Error(message)
      } else if (error.request) {
        throw new Error("Network error. Please check your connection.")
      } else {
        throw new Error(error.message || "Sign up failed")
      }
    }
  }

  const signOut = async () => {
    try {
      await axios.post(API_ENDPOINTS.AUTH.LOGOUT, {}, { withCredentials: true })
    } catch (error) {
      console.log("Logout error:", error)
    } finally {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp, isLoading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
