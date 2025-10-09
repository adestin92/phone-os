import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import WeatherComponent from "./Components/Weather.jsx";
import SettingsComponent from "./Components/Settings.jsx";
import CalculatorComponent from "./Components/Calculator.jsx";
import ClockComponent from "./Components/Clock.jsx";
import StockMarketComponent from "./Components/StockMarket.jsx";
import NotesComponent from "./Components/Notes.jsx";
import RemindersApp from "./Components/Reminders.jsx";
import PagesComponent from "./Components/Pages.jsx";
import { APPS, DOCK_APPS } from "./data/apps";

const date = new Date();
const month = date.toLocaleDateString("default", { month: "long" });
const weekday = date.toLocaleString("default", { weekday: "long" });
const today = date.getDate();

const appThemes = {
  clock: "#000000ff",
  Tips: "#fdf1e0",
  calculator: "#000000",
  pages: "linear-gradient(to bottom, #ffffffff, #ffffffff)",
  settings: "#f4f4f4ff",
  stock_market: "#f4ffffff",
  notes: "#f8f8f8",
  reminders: "#f4f4f4ff",
};

function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [openApp, setOpenApp] = useState(null);
  const [headerControl, setHeaderControl] = useState("main");

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

  const handleOpenApp = (appName) => {
    setOpenApp(appName);
    setHeaderControl("app");
    setCustomHeader(null);
  };

  const handleCloseApp = () => {
    setOpenApp(null);
    setHeaderControl("main");
    setCustomHeader(null);
  };

  // custom header functionality removed

  const renderAppContent = () => {
    switch (openApp) {
      case "clock":
        return <ClockComponent />;
      case "Tips":
        return <div>Tips App Content</div>;
      case "settings":
        return <SettingsComponent />;
      case "calculator":
        return <CalculatorComponent />;
      case "pages":
        return <PagesComponent />;
      case "stock_market":
        return <StockMarketComponent />;
      case "notes":
        return <NotesComponent />;
      case "reminders":
        return <RemindersApp />;
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
            style={
              appThemes[openApp]?.startsWith("linear-gradient")
                ? { backgroundImage: appThemes[openApp] }
                : { backgroundColor: appThemes[openApp] || "#fff" }
            }
          >
            {/* === APP HEADER CONTROL === */}
            {headerControl === "app" && (
              <div className="app-header">
                <span
                  className="material-symbols-outlined back-btn"
                  onClick={handleCloseApp}
                >
                  arrow_back_ios
                </span>
                <button
                  className="close-app"
                  onClick={handleCloseApp}
                  style={{
                    color:
                      openApp === "calculator" || openApp === "clock"
                        ? "#fff"
                        : "#333",
                  }}
                >
                  Close
                </button>
              </div>
            )}

            {/* custom header removed */}

            <div className="app-content">{renderAppContent()}</div>
          </div>
        )}

        {/* === MAIN HEADER === */}
        {headerControl === "main" && (
          <>
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
                />
                <img
                  className="health"
                  id="wifi-icon"
                  src="./wifi.png"
                  alt=""
                />
                <img
                  className="health"
                  id="battery-icon"
                  src="./battery.png"
                  alt=""
                />
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
                  <img id="add" src="./add-icon.png" alt="icon" />
                </div>
              </div>
            </section>

            <div className="app-container">
              {APPS.map((app) => (
                <img
                  key={app.id}
                  src={app.icon}
                  alt={app.id}
                  className="app"
                  onClick={() => handleOpenApp(app.id)}
                />
              ))}
            </div>

            <div className="dock">
              {DOCK_APPS.map((dockApp) => (
                <img
                  key={dockApp}
                  src={`./app_icon/${dockApp}.png`}
                  alt={dockApp}
                  className="dock-app"
                />
              ))}
            </div>
          </>
        )}
      </section>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
