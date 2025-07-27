import React from 'react'
import UserNavbar from './UserNavbar'
import { Outlet } from 'react-router-dom'

export default function UserDashboard() {
  return (
      
        <div className="min-vh-100 bg-light d-flex flex-column">
      <UserNavbar />
      <main className="flex-grow-1 p-4">
        <Outlet />
      </main>
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p className="mb-0">&copy; 2025 ServiceHub. All rights reserved.</p>
      </footer>
      </div>
    
  )
}
