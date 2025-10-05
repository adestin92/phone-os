import React, { useState } from "react";
import "./Settings.css";

const Row = ({ icon, title, subtitle, right, onClick }) => (
  <div className="settings-row" onClick={onClick}>
    <div className="row-left">
      <div className="row-icon">{icon}</div>
      <div className="row-texts">
        <div className="row-title">{title}</div>
        {subtitle && <div className="row-subtitle">{subtitle}</div>}
      </div>
    </div>
    <div className="row-right">
      {right}
      <div className="chev">›</div>
    </div>
  </div>
);



const SettingsComponent = () => {
  // demo profile data
  const profile = {
    name: "John Deer",
    subtitle: "Apple ID, iCloud, & more",
    avatar: "🧑‍💻",
  };

  return (
    <div className="settings-container">
      {/* Profile card */}
      <div className="settings-section profile-section">
        <div className="profile-left">
          <div className="profile-avatar">{profile.avatar}</div>
          <div className="profile-texts">
            <div className="profile-name">{profile.name}</div>
            <div className="profile-sub">{profile.subtitle}</div>
          </div>
        </div>
        <div className="profile-right">›</div>
      </div>

      {/* Section: Connections */}
      <div className="settings-group">
        <Row
          icon=""
          title="Wi-Fi"
        />
        <Row icon={<img src="./bluetooth_icon.png" className="settings-icon"/>} title="Bluetooth" right={<div className="value-text">On</div>} />
      </div>

      {/* Section: General */}
      <div className="settings-group">
        <Row icon="" title="General" subtitle="About · Software Update" />
        <Row icon="" title="Control Center" />
        <Row icon="" title="Display & Brightness" />
        <Row icon={<img src="./wallpaper.png" className="settings-icon"/>} title="Wallpaper" />
      </div>

        {/* Section: Notifications / Sounds */}
      <div className="settings-group">
        <Row icon="" title="Notifications" />
        <Row icon="" title="Sounds & Haptics" />
        <Row icon="" title="Screen Time" />
      </div>

      {/* Section: Privacy */}
      <div className="settings-group">
        <Row icon="" title="Privacy & Security" subtitle="Location Services" />
      </div>

      {/* Footer small text */}
      <div className="settings-footer">
        <small>Version 1.0.0 — Demo</small>
      </div>
    </div>
  );
};

export default SettingsComponent;
