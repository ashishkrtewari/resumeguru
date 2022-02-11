import React from "react";
import "./styles/App.scss";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import { Sections } from "./lists";
import { useLocalStorage } from "./hooks/useLocalStorage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import ResumeBuilder from "./components/ResumeBuilder";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const App = (props) => {
  const sections = Sections.map((section) => ({
    title: section,
    switch: false,
  }));
  const [user, setUser] = useLocalStorage("user", null);

  const logout = () => {
    setUser(null);
  };

  const RequireAuth = ({ children }) => {
    let location = useLocation();

    if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
  };

  const loadResumeBuilder = () => {
    return (
      <RequireAuth user={user}>
        <ResumeBuilder
          className="resume-builder"
          {...props}
          user={user}
          sections={sections}
          handleUserUpdate={(e) => {
            setUser(e);
            NotificationManager.success(
              "Resume Updated Successfully!",
              "Success"
            );
          }}
        />
      </RequireAuth>
    );
  };
  return (
    <Router>
      <div className="App">
        <NotificationContainer />

        {!user ? "" : <Header user={user} logout={() => logout()} />}
        <Routes>
          <Route
            path="/login"
            element={
              <LoginForm
                {...props}
                user={user}
                handleUserUpdate={(e) => {
                  setUser(e);
                }}
              />
            }
          />
          <Route path="/resume" element={loadResumeBuilder()} />
          <Route path="/" element={loadResumeBuilder()} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
