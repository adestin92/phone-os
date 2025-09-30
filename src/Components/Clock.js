import React, { useState, useEffect } from "react";
import "./Clock.css";

const ClockComponent = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Format time like 12:34
  const formattedTime = `${hours % 12 === 0 ? 12 : hours % 12}:${
    minutes < 10 ? `0${minutes}` : minutes
  } ${ampm}`;

  // Format date like Thursday, September 25
  const formattedDate = time.toLocaleDateString("default", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="clock-container">
      <div className="clock-time">{formattedTime}</div>
      <div className="clock-date">{formattedDate}</div>

      <div className="clock-tabs">
        <div className="tab active">World Clock</div>
        <div className="tab">Alarm</div>
        <div className="tab">Bedtime</div>
        <div className="tab">Stopwatch</div>
        <div className="tab">Timer</div>
      </div>

      <div className="clock-content">
        <p style={{ textAlign: "center", color: "gray", marginTop: "40px" }}>
          World Clock content placeholder
        </p>
      </div>
    </div>
  );
};

export default ClockComponent;
