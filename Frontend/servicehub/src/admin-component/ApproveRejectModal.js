import React from 'react';
import Swal from 'sweetalert2';

export default function ApproveRejectModal({ requestId, onClose }) {
  const handleStatusUpdate = async (status) => {
    try {
      const res = await fetch(`http://localhost:8080/requests/status/${requestId}?status=${status}`, {
        method: "PUT"
      });
      const data = await res.json();

      if (res.ok) {
        Swal.fire("Success", data.message, "success");
        onClose(); 
      } else {
        Swal.fire("Error", data.message || "Update failed", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="modal-backdrop show d-flex align-items-center justify-content-center">
      <div className="bg-white p-4 rounded shadow-lg" style={{ width: '400px' }}>
        <h5>Update Request Status</h5>
        <p>Approve or reject this service request?</p>

        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-success" onClick={() => handleStatusUpdate("APPROVED")}>
            Approve
          </button>
          <button className="btn btn-danger" onClick={() => handleStatusUpdate("REJECTED")}>
            Reject
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
