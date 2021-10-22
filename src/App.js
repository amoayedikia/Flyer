import React from "react";
import "./App.css";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { authRoutes, defaultRoutes } from "./routes";
import { Auth } from "aws-amplify";
import Membership from "./screens/membership/index";
import Home from "./screens/home/index";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

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
    isUserAuthenticated,
  };
  return (
    <AuthContext.Provider value={value}>
      <Router>
        <Navbar />
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Switch>
          {/* <Route
            exact
            path="/"
            render={() => {
              return isUserAuthenticated ? (
                <Redirect to="/membership" />
              ) : (
                <Redirect to="/" />
              );
            }}
          /> */}
          <Route
            exact
            path="/membership"
            render={(props) => <Membership {...props} />}
          />

          {isUserAuthenticated
            ? defaultRoutes.map((route, index) => (
                <Route exact {...route} key={index} />
              ))
            : authRoutes.map((route, index) => (
                <Route exact {...route} key={index} />
              ))}
        </Switch>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

//       <AuthContext.Provider value={value}>
//       <Router>
//           <Navbar/>

//           <Switch>
//             <Route
//               exact
//               path="/"
//               render={(props) => {
//                 return isUserAuthenticated ? (
//                   <Redirect to="/workspace"  />
//                 ) : (
//                   <Redirect to="/home"  />
//                 );
//               }}
//             />
//             <Route
//               exact
//               path="/membership"
//               render={(props) => <Membership {...props} />}
//             />
//             {isUserAuthenticated
//               ? defaultRoutes.map((route, index) => (
//                   <Route exact {...route} key={index} />
//                 ))
//               : authRoutes.map((route, index) => (
//                   <Route exact {...route} key={index} />
//                 ))}
//           </Switch>
//           <Footer />
//         </Router>
//         </AuthContext.Provider>
//         );
// }
