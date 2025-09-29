import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import PropertiesPage from './pages/PropertiesPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import VerificationInfoPage from './pages/VerificationInfoPage.jsx'
import UnauthorizedPage from './pages/UnauthorizedPage.jsx'
import { useAuth } from './context/AuthContext.jsx'

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-gray-600">Loading...</div>
  </div>
)

const RequireAuth = ({ children, requireVerified = false }) => {
  const { token, loading, emailVerified } = useAuth()
  const location = useLocation()

  if (loading) return <LoadingScreen />
  if (!token)
    return <Navigate to="/login" state={{ from: location }} replace />

  if (requireVerified && !emailVerified) {
    return <Navigate to="/verify-info" replace />
  }

  return children
}

const RequireRole = ({ allowedRoles, children }) => {
  const { role, loading } = useAuth()
  const location = useLocation()

  if (loading) return <LoadingScreen />

  if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    if (!role || !allowedRoles.includes(role)) {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />
    }
  }

  return children
}

const App = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route
      path="/verify-info"
      element={
        <RequireAuth>
          <VerificationInfoPage />
        </RequireAuth>
      }
    />
    <Route
      path="/properties"
      element={
        <RequireAuth requireVerified>
          <RequireRole allowedRoles={['buyer', 'seller', 'agent', 'admin']}>
            <PropertiesPage />
          </RequireRole>
        </RequireAuth>
      }
    />
    <Route path="/unauthorized" element={<UnauthorizedPage />} />
    <Route path="*" element={<Navigate to="/properties" replace />} />
  </Routes>
)

export default App
