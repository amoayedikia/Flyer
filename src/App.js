import "./App.css";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { authRoutes, defaultRoutes } from "./routes";
// import { AuthContext, AuthContextProvider } from "./context";

export const AuthContext = createContext();

function App() {
  const [routes, setRoutes] = useState(authRoutes);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) setIsUserAuthenticated(true);
    else setIsUserAuthenticated(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setRoutes(authRoutes);
    setIsUserAuthenticated(false);
  };
  const login = (token) => {
    localStorage.setItem("token", token);
    setRoutes(defaultRoutes);
    setIsUserAuthenticated(true);
  };

  const value = {
    logout,
    login,
    routes,
    isUserAuthenticated
  };
  return (
    <AuthContext.Provider value={value}>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return isUserAuthenticated ? (
                <Redirect to="/home" />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          {isUserAuthenticated
            ? defaultRoutes.map((route, index) => (
                <Route exact {...route} key={index} />
              ))
            : authRoutes.map((route, index) => (
                <Route exact {...route} key={index} />
              ))}
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
