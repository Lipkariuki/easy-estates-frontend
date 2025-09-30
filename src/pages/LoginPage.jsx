import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios, { setToken } from '../utils/axios.js'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const res = await axios.post('/auth/login', { email, password })
      setToken(res.data.access_token)
      navigate('/home', { replace: true })
    } catch (err) {
      setError(err.response?.data?.detail || 'Unable to sign in right now. Try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#f5fdf9] to-[#e9f5ef] px-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#e1f4eb] text-2xl text-[#158f68]">
            🏠
          </div>
          <h1 className="text-2xl font-semibold text-[#0f2e2d]">Sign in to Easy Estates</h1>
          <p className="text-sm text-[#58a889]">Manage properties, tenants, and revenue from anywhere.</p>
        </div>

        {error && (
          <div className="rounded-2xl border border-[#f5d0ce] bg-[#fdeceb] px-4 py-3 text-sm text-[#c0392b]">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="bg-white rounded-3xl shadow-sm border border-[#dbece4] px-6 py-6 space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-[#0f2e2d]">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full rounded-2xl border border-[#dbece4] bg-[#f5fdf9] px-4 py-3 text-[#0f2e2d] shadow-sm focus:border-[#158f68] focus:outline-none focus:ring-2 focus:ring-[#9fe3c5]/60"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="password" className="font-medium text-[#0f2e2d]">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-[#158f68] font-medium"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              className="w-full rounded-2xl border border-[#dbece4] bg-[#f5fdf9] px-4 py-3 text-[#0f2e2d] shadow-sm focus:border-[#158f68] focus:outline-none focus:ring-2 focus:ring-[#9fe3c5]/60"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-[#20a382] py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#1a8f70] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
