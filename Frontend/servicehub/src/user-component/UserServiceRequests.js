import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import Swal from "sweetalert2";

function UserServiceRequests() {
  const { loggedInUser } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const userId = loggedInUser?.id || JSON.parse(localStorage.getItem("user"))?.id;
    if (!userId) return;

    const fetchRequests = () => {
      fetch(`http://localhost:8080/requests/user/${userId}`)
        .then(res => res.json())
        .then(data => {
          if (data.data) setRequests(data.data);
          else Swal.fire("No Requests", data.message || "No data found", "info");
        });
    };

    fetchRequests(); 

    const intervalId = setInterval(fetchRequests, 3000); 

    return () => clearInterval(intervalId); 
  }, [loggedInUser]);

  return (
    <div className="container mt-4">
      <h3>Your Service Requests</h3>

      {requests.length === 0 && (
        <div className="alert alert-info">No bookings found.</div>
      )}

      {requests.map(req => (
        <div key={req.id} className="card mb-3">
          <div className="card-body">
            <h5>{req.serviceCategory.name} Service</h5>
            <p>
              <strong>Status:</strong> {req.status}<br />
              <strong>Preferred Time:</strong> {req.preferredDateTime.replace("T", " ")}<br />
              <strong>Provider:</strong>{" "}
              {req.serviceProvider ? req.serviceProvider.name : "Not assigned yet"}
            </p>

            {req.status === "APPROVED" && (
              <div className="alert alert-success">
                 Your request has been approved!
              </div>
            )}
            {req.status === "REJECTED" && (
              <div className="alert alert-danger">
                 Sorry, your request was rejected.
              </div>
            )}
            {req.status === "PENDING" && (
              <div className="alert alert-warning">
                 Your request is still pending.
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserServiceRequests;
