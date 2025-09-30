import { useState, useEffect } from "react";
import "./App.css";

import WeatherComponent from "./Components/Weather.jsx";
import SettingsComponent from "./Components/Settings.jsx";
import CalculatorComponent from "./Components/Calculator.jsx";
import ClockComponent from "./Components/Clock.jsx";
import StockMarketComponent from "./Components/StockMarket.jsx";
import NotesComponent from "./Components/Notes.jsx";



/** Get the current date */
const date = new Date();
const month = date.toLocaleDateString("default", { month: "long" });
const weekday = date.toLocaleString("default", { weekday: "long" });
const today = date.getDate();

const appThemes = {
  clock: "#000000ff", // light pink-ish
  instagram: "#fdf1e0", // light gradient-like
  calculator: "#000000", // iPhone black calculator theme
  gallery: "#f0f0f0", // light gray
  settings: "#ffffff", // white
  stock_market: "#f5f5f5", // light gray
  notes: "#f8f8f8", // light yellow
};

function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track which app is open (null = none)
  const [openApp, setOpenApp] = useState(null);

  const handleOpenApp = (appName) => {
    setOpenApp(appName);
  };

  const handleCloseApp = () => {
    setOpenApp(null);
  };

  /** Render content for each app */
  const renderAppContent = () => {
    switch (openApp) {
      case "clock":
        return <ClockComponent />;
      case "instagram":
        return <div>Instagram App Content</div>;
      case "settings":
        return <SettingsComponent />;
      case "calculator":
        return <CalculatorComponent />;
      case "gallery":
        return <div>Gallery App Content</div>;
      case "stock_market":
        return <StockMarketComponent />;
      case "notes":
        return <NotesComponent />;
      case "reminders":
        return <div>Reminders App Content</div>;

      default:
        return null;
    }
  };

  return (
    <div className="phone">
      <section className="screen">
        {openApp && (
          <div
            className="app-window"
            style={{ backgroundColor: appThemes[openApp] || "#fff" }}
          >
            <div className="app-header">
              <button className="close-app" onClick={handleCloseApp}>
                <img className="close-icon" alt="" src="./close.png" />
              </button>
            </div>
            <div className="app-content">{renderAppContent()}</div>
          </div>
        )}

        <section className="header">
          <div className="time">
            <p>{time}</p>
          </div>
          <div className="camera"></div>
          <div className="top-right-tray">
            <img
              className="health"
              id="signal-icon"
              src="./signal.png"
              alt=""
            ></img>
            <img
              className="health"
              id="wifi-icon"
              alt=""
              src="./wifi.png"
            ></img>
            <img
              className="health"
              id="battery-icon"
              alt=""
              src="./battery.png"
            ></img>
          </div>
        </section>

        <WeatherComponent />

        <section className="calender-time">
          <div className="cal-time">
            <p id="widget-month">{month}</p>
            <div className="date-data">
              <p id="widget-date">{today}</p>
              <p id="widget-day">{weekday}</p>
            </div>
          </div>
          <div className="reminder-container">
            <div className="reminder-widget">
              <h3>Add a reminder</h3>
              <img id="add" src="./add-icon.png" alt="icon"></img>
            </div>
          </div>
        </section>

        <div className="app-container">
          <img
            src="./app_icon/clock.png"
            onClick={() => handleOpenApp("clock")}
            alt="icon"
            id="clock"
            className="app"
          ></img>
          <img
            src="./app_icon/instagram.png"
            onClick={() => handleOpenApp("instagram")}
            alt="icon"
            id="Ins"
            className="app"
          ></img>
          <img
            src="./app_icon/calculator.svg"
            onClick={() => handleOpenApp("calculator")}
            alt="icon"
            className="app"
          ></img>
          <img
            src="./app_icon/gallery.png"
            onClick={() => handleOpenApp("gallery")}
            alt="icon"
            className="app"
          ></img>
          <img
            src="./app_icon/settings.png"
            onClick={() => handleOpenApp("settings")}
            alt="icon"
            className="app"
          ></img>
          <img
            src="./app_icon/stock_market.png"
            onClick={() => handleOpenApp("stock_market")}
            alt="icon"
            className="app"
          ></img>
          <img
            src="./app_icon/notes.png"
            onClick={() => handleOpenApp("notes")}
            alt="icon"
            className="app"
          ></img>
          <img
            src="./app_icon/reminders.svg"
            onClick={() => handleOpenApp("reminders")}
            alt="icon"
            className="app"
          ></img>
        </div>

        <div className="dock">
          <img
            src="./app_icon/phone_call.png"
            alt="icon"
            className="dock-app"
          ></img>
          <img
            src="./app_icon/messages.png"
            alt="icon"
            className="dock-app"
          ></img>
          <img src="./app_icon/email.png" alt="icon" className="dock-app"></img>
          <img src="./app_icon/music.png" alt="icon" className="dock-app"></img>
        </div>
      </section>
    </div>
  );
}

export default App;
