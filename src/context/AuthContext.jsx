import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import axios from '../utils/axios.js'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(!!localStorage.getItem('token'))
  const [error, setError] = useState(null)

  const setToken = useCallback((newToken) => {
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
    setTokenState(newToken)
  }, [])

  const clearSession = useCallback(() => {
    setToken(null)
    setUser(null)
  }, [setToken])

  const fetchUser = useCallback(async () => {
    if (!localStorage.getItem('token')) {
      setUser(null)
      setLoading(false)
      return null
    }
    setLoading(true)
    setError(null)
    try {
      const { data } = await axios.get('/auth/me')
      setUser(data)
      return data
    } catch (err) {
      clearSession()
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [clearSession])

  useEffect(() => {
    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }
    let active = true
    setLoading(true)
    setError(null)
    axios
      .get('/auth/me')
      .then(({ data }) => {
        if (active) setUser(data)
      })
      .catch((err) => {
        if (!active) return
        clearSession()
        setError(err)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [token, clearSession])

  const logout = useCallback(() => {
    clearSession()
  }, [clearSession])

  const value = useMemo(
    () => ({
      token,
      user,
      role: user?.role ?? null,
      emailVerified: Boolean(user?.email_verified),
      loading,
      error,
      setToken,
      refreshUser: fetchUser,
      logout,
    }),
    [token, user, loading, error, setToken, fetchUser, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export default AuthContext
