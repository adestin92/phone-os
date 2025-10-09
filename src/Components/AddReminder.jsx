import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddReminder.css";

const AddReminder = ({ onCancel, onSave }) => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSave = () => {
    if (!title.trim()) return;

    const newReminder = {
      id: Date.now(),
      title,
      notes,
      date: date ? date.toISOString().split("T")[0] : null,
      time: time || null,
      flagged: false,
      scheduled: !!date,
      createdAt: new Date(),
    };

    onSave(newReminder);
  };

  const handleTimeSelect = (hour, minute, ampm) => {
    const formatted = `${hour}:${minute} ${ampm}`;
    setTime(formatted);
    setShowTimePicker(false);
  };

  const hours = [...Array(12).keys()].map((h) => String(h + 1).padStart(2, "0"));
  const minutes = [...Array(60).keys()].map((m) => String(m).padStart(2, "0"));
  const ampmValues = ["AM", "PM"];

  return (
    <div className="add-reminder-screen">
      {/* Header */}
      <div className="reminder-header">
        <p className="header-title">New Reminder</p>
      </div>

      {/* Form */}
      <div className="reminder-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="form-row">
          {/* 📅 Date Picker */}
          <div className="date-and-time" style={{ position: "relative" }}>
            <div
              className="dt-display"
              onClick={() => {
                setShowDatePicker((s) => !s);
                setShowTimePicker(false);
              }}
            >
              <span>{date ? date.toLocaleDateString() : "Date"}</span>
              <span className="dt-arrow">▾</span>
            </div>

            {showDatePicker && (
              <div className="picker-dropdown ios-calendar">
                <DatePicker
                  selected={date}
                  onChange={(d) => {
                    setDate(d);
                    setShowDatePicker(false);
                  }}
                  inline
                  calendarClassName="ios-datepicker"
                />
              </div>
            )}
          </div>

          {/* ⏰ iOS-style Time Picker */}
          <div className="date-and-time" style={{ position: "relative" }}>
            <div
              className="dt-display"
              onClick={() => {
                setShowTimePicker((s) => !s);
                setShowDatePicker(false);
              }}
            >
              <span>{time ? time : "Time"}</span>
              <span className="dt-arrow">▾</span>
            </div>

            {showTimePicker && (
              <div className="picker-dropdown ios-timepicker">
                <div className="time-scroll">
                  <div className="time-col">
                    {hours.map((h) => (
                      <div key={h} onClick={() => handleTimeSelect(h, "00", "AM")}>
                        {h}
                      </div>
                    ))}
                  </div>
                  <div className="time-col">
                    {minutes.map((m) => (
                      <div key={m} onClick={() => handleTimeSelect("12", m, "AM")}>
                        {m}
                      </div>
                    ))}
                  </div>
                  <div className="time-col ampm">
                    {ampmValues.map((v) => (
                      <div key={v} onClick={() => handleTimeSelect("12", "00", v)}>
                        {v}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="reminders-button-container">
            <button className="cancel-btn" onClick={onCancel}>
            Cancel
            </button>
            <button className="save-btn small" onClick={handleSave}>
            Add
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReminder;
