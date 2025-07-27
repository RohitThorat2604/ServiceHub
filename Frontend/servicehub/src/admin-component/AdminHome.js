import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminHome() {
  const [userCount, setUserCount] = useState(0);
  const [providerCount, setProviderCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    // Fetch total users
    fetch("http://localhost:8080/users/count")
      .then(res => res.json())
      .then(data => setUserCount(data))
      .catch(err => console.error("Error fetching user count:", err));

    // Fetch total providers
    fetch("http://localhost:8080/providers/count")
      .then(res => res.json())
      .then(data => setProviderCount(data))
      .catch(err => console.error("Error fetching provider count:", err));

    // Fetch total service requests
    fetch("http://localhost:8080/requests/count")
      .then(res => res.json())
      .then(data => setRequestCount(data))
      .catch(err => console.error("Error fetching request count:", err));
  }, []);

  return (
    <div className="container mt-3">
      <h2 className="text-center mb-5 fw-bold text-primary">
        Welcome to the Admin Dashboard
      </h2>

      {/* Quick Actions */}
      <div className="row mb-5">
        <div className="col-md-4">
          <div className="card shadow-sm text-center p-4 h-100">
            <i className="bi bi-gear display-4 text-primary mb-3"></i>
            <h5>Manage Services</h5>
            <p>View, add or delete service categories offered on the platform.</p>
            <Link to="/admin/services" className="btn btn-outline-primary mt-2">Go</Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm text-center p-4 h-100">
            <i className="bi bi-person-workspace display-4 text-success mb-3"></i>
            <h5>Manage Providers</h5>
            <p>Review and manage all registered service providers.</p>
            <Link to="/admin/providers/All" className="btn btn-outline-success mt-2">Go</Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm text-center p-4 h-100">
            <i className="bi bi-card-checklist display-4 text-info mb-3"></i>
            <h5>All Requests</h5>
            <p>Check and handle user service requests.</p>
            <Link to="/admin/requests" className="btn btn-outline-info mt-2">Go</Link>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row text-center">
        <div className="col-md-4">
          <div className="card bg-light shadow-sm py-4">
            <h5>Total Users</h5>
            <p className="display-6 text-primary">{userCount}</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-light shadow-sm py-4">
            <h5>Total Providers</h5>
            <p className="display-6 text-success">{providerCount}</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-light shadow-sm py-4">
            <h5>Total Requests</h5>
            <p className="display-6 text-info">{requestCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
