import React, { useState, useEffect, useRef } from "react";
import AddReminder from "./AddReminder";
import SearchBar from "./SearchBar";
import { toast } from "react-toastify";
import "./Reminders.css";

const Reminders = () => {
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem("reminders");
    return saved ? JSON.parse(saved) : [];
  });

  const [showAddScreen, setShowAddScreen] = useState(false);
  const [search, setSearch] = useState("");
  const timersRef = useRef([]); // store active timeouts

  // Load reminders from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("reminders");
    if (saved) setReminders(JSON.parse(saved));
  }, []);

  // Persist reminders to localStorage on every update
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  // Setup timers for due reminders
  useEffect(() => {
    // Clear previous timers
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    reminders.forEach((reminder) => {
      if (reminder.date && reminder.time && !reminder.notified) {
        const reminderDateTime = new Date(`${reminder.date}T${reminder.time}`);
        const delay = reminderDateTime - new Date();

        if (delay > 0) {
          // Schedule toast
          const timer = setTimeout(() => {
            toast.info(`⏰ Reminder: ${reminder.title}`, {
              position: "top-right",
              autoClose: 5000,
            });

            setReminders((prev) =>
              prev.map((r) =>
                r.id === reminder.id ? { ...r, notified: true } : r
              )
            );
          }, delay);

          timersRef.current.push(timer);
        }
      }
    });

    // Cleanup
    return () => timersRef.current.forEach(clearTimeout);
  }, [reminders]);

  // Add a new reminder
  const handleAddReminder = (newReminder) => {
    setReminders((prev) => [...prev, newReminder]);
    setShowAddScreen(false);

    toast.success("Reminder added successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // Filter reminders
  const filteredReminders = reminders.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.notes.toLowerCase().includes(search.toLowerCase())
  );

  // Summary counts
  const todayStr = new Date().toISOString().split("T")[0];
  const counts = {
    today: reminders.filter((r) => r.date === todayStr).length,
    scheduled: reminders.filter((r) => r.date).length,
    all: reminders.length,
    flagged: reminders.filter((r) => r.flagged).length,
  };

  // Toggle add screen
  if (showAddScreen) {
    return (
      <AddReminder
        onCancel={() => setShowAddScreen(false)}
        onSave={handleAddReminder}
      />
    );
  }

  return (
    <div className="reminders-container">
      {/*Header + Search */}
      <div className="reminders-header">
        <h2>Reminders</h2>
        <SearchBar
          placeholder="Search reminders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Summary Boxes */}
      <div className="summary-grid">
        <div className="summary-box">
          <div>
            <img
              src="./Reminders_icon/calendar_day.png"
              className="settings-icon"
              alt="Today"
            />
            <p className="summary-title">Today</p>
          </div>
          <h3>{counts.today}</h3>
        </div>

        <div className="summary-box">
          <div>
            <img
              src="./Reminders_icon/calendar.png"
              className="settings-icon"
              alt="Scheduled"
            />
            <p className="summary-title">Scheduled</p>
          </div>
          <h3>{counts.scheduled}</h3>
        </div>

        <div className="summary-box gray">
          <div>
            <img
              src="./Reminders_icon/drawer.png"
              className="settings-icon"
              alt="All"
            />
            <p className="summary-title">All</p>
          </div>
          <h3>{counts.all}</h3>
        </div>

        <div className="summary-box red">
          <div>
            <img
              src="./Reminders_icon/report.png"
              className="settings-icon"
              alt="Flagged"
            />
            <p className="summary-title">Flagged</p>
          </div>
          <h3>{counts.flagged}</h3>
        </div>
      </div>

      {/* Reminders List */}
      <div className="reminder-list">
        {filteredReminders.length === 0 ? (
          <p className="no-reminders">No reminders yet.</p>
        ) : (
          filteredReminders.map((r) => (
            <div key={r.id} className="reminder-item">
              <div className="reminder-info">
                <h4>{r.title}</h4>
                {r.notes && <p>{r.notes}</p>}
                {r.date && (
                  <span className="reminder-datetime">
                    {r.date} {r.time && r.time}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Reminder Button */}
      <button
        className="add-reminder-btn"
        onClick={() => setShowAddScreen(true)}
      >
        +
      </button>
    </div>
  );
};

export default Reminders;
