import Home from "./screens/home";
import LoginScreen from "./screens/login";
import Signup from "./screens/signup";
import Workspace from "./screens/workspace";
import Membership from "./screens/membership";

// defaultRoutes is accessible for when you are NOT logged in
const defaultRoutes = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/workspace",
    component: Workspace,
  },
  {
    path: "/membership",
    component: Membership,
  },
  {
    path: "/login",
    component: LoginScreen,
  },
  {
    path: "/signup",
    component: Signup,
  },
  {
    path: "/workspace/:id",
    component: Workspace,
  },
];
// authRoutes is accessible for when you are logged in
const authRoutes = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: LoginScreen,
  },
  {
    path: "/signup",
    component: Signup,
  },
  {
    path: "/workspace/:id",
    component: Workspace,
  },
];
export { defaultRoutes, authRoutes };
