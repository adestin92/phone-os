import React, { useState, useEffect, useRef } from "react";
import AddReminder from "./AddReminder";
import SearchBar from "./Searchbar";
import { toast } from "react-toastify";
import "./Reminders.css";
import SummaryBox from "./SummaryBox";

const Reminders = () => {
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem("reminders");
    return saved ? JSON.parse(saved) : [];
  });

  const [showAddScreen, setShowAddScreen] = useState(false);
  const [search, setSearch] = useState("");
  const timersRef = useRef([]);

  // Load reminders
  useEffect(() => {
    const saved = localStorage.getItem("reminders");
    if (saved) setReminders(JSON.parse(saved));
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  // Setup toast timers
  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    reminders.forEach((reminder) => {
      if (reminder.date && reminder.time && !reminder.notified) {
        const reminderDateTime = new Date(`${reminder.date}T${reminder.time}`);
        const delay = reminderDateTime - new Date();

        if (delay > 0) {
          const timer = setTimeout(() => {
            toast.info(`⏰ Reminder: ${reminder.title}`, {
              position: "top-right",
              autoClose: 5000,
            });

            setReminders((prev) =>
              prev.map((r) =>
                r.id === reminder.id ? { ...r, notified: true } : r,
              ),
            );
          }, delay);

          timersRef.current.push(timer);
        }
      }
    });

    return () => timersRef.current.forEach(clearTimeout);
  }, [reminders]);

  // Add reminder handler
  const handleAddReminder = (newReminder) => {
    setReminders((prev) => [...prev, newReminder]);
    setShowAddScreen(false);
    toast.success("Reminder added successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // Handle entering Add Reminder screen
  const handleShowAddScreen = () => {
    setShowAddScreen(true);
    // show add screen
  };

  const handleCancelAdd = () => {
    setShowAddScreen(false);
  };

  // Filter reminders
  const filteredReminders = reminders.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.notes.toLowerCase().includes(search.toLowerCase()),
  );

  // Summary
  const todayStr = new Date().toISOString().split("T")[0];
  const counts = {
    today: reminders.filter((r) => r.date === todayStr).length,
    scheduled: reminders.filter((r) => r.date).length,
    all: reminders.length,
    flagged: reminders.filter((r) => r.flagged).length,
  };

  // Render Add Screen
  if (showAddScreen) {
    return (
      <AddReminder onCancel={handleCancelAdd} onSave={handleAddReminder} />
    );
  }

  // no custom header logic

  return (
    <div className="reminders-container">
      {/* Search */}
      <div className="reminders-header">
        <SearchBar
          placeholder="Search reminders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Summary Boxes */}
      <div className="summary-grid">
        <SummaryBox
          icon="./Reminders_icon/calendar_day.png"
          title="Today"
          value={counts.today}
        />
        <SummaryBox
          icon="./Reminders_icon/calendar.png"
          title="Scheduled"
          value={counts.scheduled}
        />
        <SummaryBox
          icon="./Reminders_icon/drawer.png"
          title="All"
          value={counts.all}
          className="gray"
        />
        <SummaryBox
          icon="./Reminders_icon/report.png"
          title="Flagged"
          value={counts.flagged}
          className="red"
        />
      </div>

      {/* List */}
      <div className="reminder-list">
        {filteredReminders.length === 0 ? (
          <p className="no-reminders">No reminders yet.</p>
        ) : (
          filteredReminders.map((r) => (
            <div key={r.id} className="reminder-item">
              <h4>{r.title}</h4>
              {r.notes && <p>{r.notes}</p>}
              {r.date && (
                <span className="reminder-datetime">
                  {r.date} {r.time && r.time}
                </span>
              )}
            </div>
          ))
        )}
      </div>
      {/* Footer (always visible) */}
      <div className="reminder-footer">
        <button
          className="add-reminder-btn"
          onClick={handleShowAddScreen}
          aria-label="Add reminder"
        >
          +
        </button>
        New Reminder
      </div>
    </div>
  );
};

export default Reminders;
