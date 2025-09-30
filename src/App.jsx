import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage.jsx'
import PropertiesPage from './pages/PropertiesPage.jsx'
import TenantsPage from './pages/TenantsPage.jsx'
import MaintenancePage from './pages/MaintenancePage.jsx'
import PaymentsPage from './pages/PaymentsPage.jsx'
import AppShell from './components/layout/AppShell.jsx'

const App = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />

    <Route element={<AppShell />}>
      <Route path="/home" element={<HomePage />} />
      <Route path="/properties" element={<PropertiesPage />} />
      <Route path="/tenants" element={<TenantsPage />} />
      <Route path="/maintenance" element={<MaintenancePage />} />
      <Route path="/payments" element={<PaymentsPage />} />
    </Route>

    <Route path="/" element={<Navigate to="/home" replace />} />
    <Route path="*" element={<Navigate to="/home" replace />} />
  </Routes>
)

export default App
