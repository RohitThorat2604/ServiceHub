import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


export default function AdminNavbar() {


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/admin">Admin Dashboard</NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">

            <li className="nav-item">
              <NavLink className="nav-link fw-bold" to="/admin/services">Manage Services</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-bold" to="/admin/providers/All">Manage Providers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-bold" to="/admin/requests">All Requests</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
