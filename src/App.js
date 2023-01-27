import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [currentRoute, setCurrentRoute] = useState(null);

  const handleLocationChange = () => {
    const path = window.location.pathname;
    switch (path) {
      case "/":
        setCurrentRoute(<Home />);
        break;
      case "/main":
        setCurrentRoute(<Main />);
        break;
      case "/profile":
        setCurrentRoute(<Profile />);
        break;
      default:
        setCurrentRoute(<NotFound />);
        break;
    }
  };

  useEffect(() => {
    handleLocationChange();
    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const handleLinkClick = (path) => {
    window.history.pushState({}, null, path);
    handleLocationChange();
  };

  return (
    <div className="app-container">
      <div className="nav-container">
        <button className="nav-button" onClick={() => handleLinkClick("/")}>
          Home
        </button>
        <button className="nav-button" onClick={() => handleLinkClick("/main")}>
          Main
        </button>
        <button
          className="nav-button"
          onClick={() => handleLinkClick("/profile")}
        >
          Profile
        </button>
      </div>
      <div className="route-container">{currentRoute}</div>
    </div>
  );
};

const Home = () => <h1>Home</h1>;
const Main = () => <h1>Main</h1>;
const Profile = () => <h1>Profile</h1>;
const NotFound = () => <h1>404 Not Found</h1>;

export default App;
