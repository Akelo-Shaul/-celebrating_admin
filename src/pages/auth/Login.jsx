import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Lock, LogIn, ChevronDown } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { DUMMY_USERS } from '../../services/authService'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showCredentials, setShowCredentials] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(username, password)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickLogin = (user) => {
    setUsername(user.username)
    setPassword(user.password)
    setShowCredentials(false)
  }

  const demoUsers = Object.values(DUMMY_USERS)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <img
            src="/celebratinglogo.png"
            alt="Celebrating Logo"
            className="h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Sign in to continue</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 outline-none transition-all"
                  placeholder="Enter username"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 outline-none transition-all"
                  placeholder="Enter password"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-200 to-yellow-100 text-gray-900 font-medium py-2.5 rounded-lg hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => setShowCredentials(!showCredentials)}
              className="w-full flex items-center justify-between text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span className="font-medium">Demo Credentials</span>
              <ChevronDown
                size={16}
                className={`transform transition-transform ${showCredentials ? 'rotate-180' : ''}`}
              />
            </button>

            {showCredentials && (
              <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
                {demoUsers.map((user) => (
                  <button
                    key={user.username}
                    onClick={() => handleQuickLogin(user)}
                    className="w-full text-left px-3 py-2 rounded-lg border border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.position}</div>
                      </div>
                      <div className="text-xs text-gray-400">{user.username}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
