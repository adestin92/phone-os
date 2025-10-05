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
    avatar: <img src="./settings_icon/man.png" className="profile-icon"/>,
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
          icon={<img src="./settings_icon/wifi.png" className="settings-icon"/>}
          title="Wi-Fi"
        />
        <Row icon={<img src="./settings_icon/bluetooth_icon.png" className="settings-icon"/>} title="Bluetooth" right={<div className="value-text">On</div>} />
      </div>

      {/* Section: General */}
      <div className="settings-group">
        <Row icon={<img src="./settings_icon/settings.png" className="settings-icon"/>} title="General" />
        <Row icon={<img src="./settings_icon/brightness.png" className="settings-icon"/>} title="Display & Brightness" />
        <Row icon={<img src="./settings_icon/wallpaper.png" className="settings-icon"/>} title="Wallpaper" />
      </div>

        {/* Section: Notifications / Sounds */}
      <div className="settings-group">
        <Row icon={<img src="./settings_icon/notification.png" className="settings-icon"/>} title="Notifications" />
        <Row icon={<img src="./settings_icon/volume.png" className="settings-icon"/>} title="Sounds & Haptics" />
        <Row icon={<img src="./settings_icon/hourglass.png" className="settings-icon"/>} title="Screen Time" />
      </div>

      {/* Section: Privacy */}
      <div className="settings-group">
        <Row icon={<img src="./settings_icon/hand.png" className="settings-icon"/>} title="Privacy & Security"/>
      </div>

      {/* Footer small text */}
      <div className="settings-footer">
        <small>Version 1.0.0 — Demo</small>
      </div>
    </div>
  );
};

export default SettingsComponent;
