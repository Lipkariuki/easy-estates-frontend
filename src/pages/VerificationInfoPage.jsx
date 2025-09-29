import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const VerificationInfoPage = () => {
  const { emailVerified, refreshUser, user, logout } = useAuth()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    if (emailVerified) {
      navigate('/properties', { replace: true })
    }
  }, [emailVerified, navigate])

  const checkStatus = async () => {
    setChecking(true)
    setMessage('')
    try {
      const refreshed = await refreshUser()
      if (refreshed?.email_verified) {
        navigate('/properties', { replace: true })
      } else {
        setMessage('Your email is still pending verification. Please check again soon.')
      }
    } catch (err) {
      setMessage(err.response?.data?.detail || err.message)
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="bg-white rounded shadow p-6 w-full max-w-lg space-y-4">
        <h1 className="text-xl font-semibold">Verify your email</h1>
        <p className="text-gray-700">
          {user?.email
            ? `We've sent a verification link to ${user.email}. Please confirm your email to continue.`
            : "We've sent you a verification email. Please confirm your email to continue."}
        </p>
        <p className="text-sm text-gray-600">
          Once you've clicked the verification link, click the button below to refresh your status. You won't be able to access your dashboard until your email is verified.
        </p>
        {message && <div className="text-sm text-purple-700">{message}</div>}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
          <button
            onClick={checkStatus}
            className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={checking}
          >
            {checking ? 'Checking…' : 'I have verified my email'}
          </button>
          <button
            onClick={() => {
              logout()
              navigate('/login', { replace: true })
            }}
            className="border border-purple-600 text-purple-600 px-4 py-2 rounded"
            type="button"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  )
}

export default VerificationInfoPage
