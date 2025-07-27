import React, { useEffect, useState } from "react";

export default function TimeSlotPicker({ providerId, selectedDate, onSlotSelect }) {
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  const allSlots = ["09:00", "12:00", "15:00", "18:00"];

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!providerId || !selectedDate) return;

      const formattedDate = selectedDate.toISOString().split("T")[0];
      console.log("Fetching slots for provider:", providerId, "on date:", formattedDate);

      try {
        const res = await fetch(
          `http://localhost:8080/requests/bookedSlots?providerId=${providerId}&date=${formattedDate}`
        );
        const data = await res.json();
        const normalized = (data || []).map(t => t.substring(0, 5));
        console.log("Booked slots received:", normalized);
        setBookedSlots(normalized);
        setSelectedSlot("");
      } catch (err) {
        console.error("Error fetching booked slots:", err);
      }
    };

    fetchBookedSlots();
  }, [providerId, selectedDate]);

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    onSlotSelect(slot);
  };

  
  const todayStr = new Date().toISOString().split("T")[0];
  const selectedStr = selectedDate.toISOString().split("T")[0];
  const isToday = selectedStr === todayStr;

 
  const isPastDate = selectedDate < new Date(new Date().setHours(0, 0, 0, 0));

  
  const currentTime = new Date().toTimeString().slice(0, 5);

  return (
    <div>
      <h5>Select a Time Slot</h5>
      {isPastDate && (
        <p className="text-danger">You cannot book slots in the past.</p>
      )}
      <div className="d-flex flex-wrap gap-2">
        {allSlots.map((slot) => {
          const isBooked = bookedSlots.includes(slot);
          const isPastTimeToday = isToday && slot <= currentTime;
          const disableSlot = isBooked || isPastTimeToday || isPastDate;

          return (
            <button
              key={slot}
              className={`btn ${
                disableSlot
                  ? "btn-danger"
                  : slot === selectedSlot
                  ? "btn-warning"
                  : "btn-success"
              }`}
              disabled={disableSlot}
              onClick={() => handleSlotClick(slot)}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
}
