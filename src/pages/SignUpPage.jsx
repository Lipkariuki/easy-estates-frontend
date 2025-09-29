import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../utils/axios.js'
import { useAuth } from '../context/AuthContext.jsx'

const roles = [
  { value: 'buyer', label: 'Buyer' },
  { value: 'seller', label: 'Seller' },
  { value: 'agent', label: 'Agent' },
]

const SignUpPage = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState(roles[0]?.value ?? '')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const { setToken, refreshUser } = useAuth()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSubmitting(true)
    try {
      const payload = { email, password, role }
      if (fullName) payload.full_name = fullName
      const res = await axios.post('/auth/register', payload)
      if (res.data?.access_token) {
        setToken(res.data.access_token)
        const user = await refreshUser()
        if (user?.email_verified) {
          navigate('/properties', { replace: true })
        } else {
          navigate('/verify-info', { replace: true })
        }
        return
      }
      setSuccess('Account created! Please verify your email before signing in.')
    } catch (err) {
      setError(err.response?.data?.detail || err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <form onSubmit={submit} className="bg-white rounded shadow p-6 w-full max-w-md space-y-4">
        <h1 className="text-xl font-semibold">Create an account</h1>
        <p className="text-sm text-gray-600">
          Sign up to start exploring Easy Estates. You'll receive a verification email after registering.
        </p>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <div className="space-y-2">
          <input
            className="border rounded px-3 py-2 w-full"
            placeholder="Full name (optional)"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          <select
            className="border rounded px-3 py-2 w-full"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            {roles.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-purple-600 text-white px-3 py-2 rounded w-full disabled:opacity-50"
          disabled={submitting}
        >
          {submitting ? 'Creating account…' : 'Sign up'}
        </button>
        <p className="text-sm text-gray-600 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}

export default SignUpPage
