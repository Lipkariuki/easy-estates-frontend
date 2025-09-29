import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from '../utils/axios.js'
import { useAuth } from '../context/AuthContext.jsx'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { setToken, refreshUser, loading: authLoading, token, emailVerified } = useAuth()

  useEffect(() => {
    if (authLoading) return
    if (token) {
      if (emailVerified) {
        navigate('/properties', { replace: true })
      } else {
        navigate('/verify-info', { replace: true })
      }
    }
  }, [authLoading, token, emailVerified, navigate])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await axios.post('/auth/login', { email, password })
      if (res.data?.access_token) {
        setToken(res.data.access_token)
        const user = await refreshUser()
        const redirectTo = location.state?.from?.pathname || '/properties'
        if (user?.email_verified) {
          navigate(redirectTo, { replace: true })
        } else {
          navigate('/verify-info', { replace: true })
        }
      } else {
        setError('Login response did not include an access token.')
      }
    } catch (err) {
      setError(err.response?.data?.detail || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <form onSubmit={submit} className="bg-white rounded shadow p-6 w-full max-w-sm space-y-4">
        <h1 className="text-xl font-semibold">Sign in</h1>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div className="space-y-2">
          <input
            className="border rounded px-3 py-2 w-full"
            placeholder="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="border rounded px-3 py-2 w-full"
            placeholder="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-purple-600 text-white px-3 py-2 rounded w-full disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
        <p className="text-sm text-gray-600 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-600 hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage
