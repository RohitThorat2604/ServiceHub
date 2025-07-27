import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function ManageRequests() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await fetch("http://localhost:8080/requests");
      const data = await res.json();
      setRequests(data.data || []);
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    }
  };

  useEffect(() => {
  fetchRequests(); 

  const intervalId = setInterval(() => {
    fetchRequests(); 
  }, 3000); 

  return () => clearInterval(intervalId); 
}, []);

  const handleStatusUpdate = async (requestId, status) => {
    try {
      const res = await fetch(`http://localhost:8080/requests/status/${requestId}?status=${status}`, {
        method: 'PUT'
      });
      const result = await res.json();
      Swal.fire("Success", result.message, "success");
      fetchRequests();
    } catch (err) {
      console.error("Error updating status:", err);
      Swal.fire("Error", "Failed to update request status", "error");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Manage Service Requests</h2>

      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Service</th>
              <th>Preferred Time</th>
              <th>Status</th>
              <th>Provider</th>
              <th>Actions</th> 
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.user?.firstname} {req.user?.lastname}</td>
                <td>{req.serviceCategory?.name}</td>
                <td>{req.preferredDateTime?.replace("T", " ")}</td>
                <td>
                  {req.status === "APPROVED" && <span className="badge bg-success">{req.status}</span>}
                  {req.status === "REJECTED" && <span className="badge bg-danger">{req.status}</span>}
                  {req.status === "PENDING" && <span className="badge bg-warning text-dark">{req.status}</span>}
                </td>
                <td>{req.serviceProvider?.name || "Not Assigned"}</td>
                <td>
                  {req.status === "PENDING" ? (
                    <>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => handleStatusUpdate(req.id, "APPROVED")}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleStatusUpdate(req.id, "REJECTED")}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-muted"> Completed</span> 
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
