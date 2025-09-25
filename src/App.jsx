import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import PropertiesPage from './pages/PropertiesPage.jsx'
import LoginPage from './pages/LoginPage.jsx'

const App = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/properties" element={<PropertiesPage />} />
    <Route path="*" element={<Navigate to="/properties" replace />} />
  </Routes>
)

export default App
