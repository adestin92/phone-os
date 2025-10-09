import React from "react";

const SummaryBox = ({ icon, title, value, className = "" }) => (
  <div className={`summary-box ${className}`.trim()}>
    <div>
      <img src={icon} className="settings-icon" alt={title} />
      <p className="summary-title">{title}</p>
    </div>
    <h3>{value}</h3>
  </div>
);

export default SummaryBox;
