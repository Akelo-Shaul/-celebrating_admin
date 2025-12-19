import React, { createContext, useContext, useState, useEffect } from 'react'
import { authenticateUser } from '../services/authService'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true
  })

  // Check localStorage on mount to restore session
  useEffect(() => {
    const checkStoredAuth = () => {
      try {
        const stored = localStorage.getItem('celebrating_admin_auth')
        if (stored) {
          const data = JSON.parse(stored)
          if (data.isAuthenticated && data.user) {
            setAuthState({
              isAuthenticated: true,
              user: data.user,
              loading: false
            })
            return
          }
        }
      } catch (error) {
        console.error('Auth check error:', error)
      }
      setAuthState({ isAuthenticated: false, user: null, loading: false })
    }

    checkStoredAuth()
  }, [])

  // Login function - authenticates against dummy user data
  const login = async (username, password) => {
    try {
      // Authenticate user using auth service
      const user = await authenticateUser(username, password)

      // Create auth data
      const authData = {
        isAuthenticated: true,
        user: user
      }

      // Save to localStorage
      localStorage.setItem('celebrating_admin_auth', JSON.stringify(authData))

      // Update state
      setAuthState({
        isAuthenticated: true,
        user: user,
        loading: false
      })

      return user
    } catch (error) {
      throw error
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('celebrating_admin_auth')
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false
    })
  }

  const value = {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    loading: authState.loading,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
