import React, { useState } from "react";
import "./styles/App.scss";
import Header from "./components/Header";
import Login from "./components/Login";
import { Sections } from "./lists";
import { getUserByEmail } from "./queries";
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
  const [user, setUser] = useState(null);

  const username = localStorage.getItem("email");
  if (username) {
    (async () => {
      const user = await props.client.query({
        query: getUserByEmail,
        variables: {
          email: username,
        },
      });
      setUser(user.data.userByEmail);
    })();
  }
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
        <Header user={user} logout={() => logout()} />
        <Routes>
          <Route
            path="/login"
            element={
              <Login
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
