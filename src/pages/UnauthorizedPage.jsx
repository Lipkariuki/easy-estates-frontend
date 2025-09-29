import React from 'react'
import { Link } from 'react-router-dom'

const UnauthorizedPage = () => (
  <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
    <div className="bg-white rounded shadow p-6 w-full max-w-md space-y-4 text-center">
      <h1 className="text-xl font-semibold">Access restricted</h1>
      <p className="text-gray-700">
        You don't have permission to view this page. Please contact an administrator if you believe this is a mistake.
      </p>
      <div className="space-x-2">
        <Link to="/properties" className="text-purple-600 hover:underline">
          Go back home
        </Link>
      </div>
    </div>
  </div>
)

export default UnauthorizedPage
