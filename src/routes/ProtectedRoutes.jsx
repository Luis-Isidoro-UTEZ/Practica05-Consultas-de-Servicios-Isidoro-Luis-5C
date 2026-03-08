import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoutes({ isAllowed = false }) {
    if (!isAllowed) {
        return <Navigate to="/login"  />
    }

    return <Outlet />
}

export default ProtectedRoutes