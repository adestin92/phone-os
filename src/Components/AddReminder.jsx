import React, { useState } from "react";
import "./AddReminder.css";

const AddReminder = ({ onCancel, onSave }) => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSave = () => {
    if (!title.trim()) return;

    const newReminder = {
      id: Date.now(),
      title,
      notes,
      date: date || null,
      time: time || null,
      flagged: false,
      scheduled: !!date, // mark as scheduled if a date was chosen
      createdAt: new Date(),
    };

    onSave(newReminder);
  };

  return (
    <div className="add-reminder-screen">
      <h2>New Reminder</h2>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter reminder title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea
          placeholder="Add notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <div className="action-buttons">
        <button className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddReminder;
