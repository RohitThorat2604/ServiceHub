import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthContext';
import TimeSlotPicker from './TimeSlotPicker';

export default function BookServiceForm() {
  const { categoryId, providerId } = useParams();
  const { loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(null); 
  const [selectedTime, setSelectedTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loggedInUser) {
      Swal.fire("Login Required", "Please log in to book a service", "warning");
      navigate("/login");
      return;
    }

    if (!selectedDate || !selectedTime) {
      Swal.fire("Missing Details", "Please select both date and time", "warning");
      return;
    }

    const preferredDateTime = `${selectedDate.toISOString().split("T")[0]}T${selectedTime}:00`;

    const requestBody = {
      status: "PENDING",
      preferredDateTime,
      user: { id: loggedInUser.id },
      serviceProvider: { id: providerId },
      serviceCategory: { id: categoryId }
    };

    const res = await fetch("http://localhost:8080/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    const result = await res.json();
    if (res.ok) {
      Swal.fire("Success", "Request submitted!", "success");
      navigate("/user/requests");
    } else {
      Swal.fire("Error", result.message || "Something went wrong", "error");
    }
  };

  return (
    <div className="container mt-4">
      <h4>Book Service</h4>
      <form onSubmit={handleSubmit}>
        <label className="form-label">Preferred Date</label>
        <input
          type="date"
          className="form-control mb-3"
          value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            setSelectedDate(newDate);
            setSelectedTime(""); 
          }}
          min={new Date().toISOString().split("T")[0]}
          required
        />

        {selectedDate && (
          <TimeSlotPicker
            providerId={providerId}
            selectedDate={selectedDate}
            onSlotSelect={setSelectedTime}
          />
        )}

        <button type="submit" className="btn btn-success mt-3">Submit Request</button>
      </form>
    </div>
  );
}
