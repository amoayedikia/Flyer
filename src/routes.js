import HomeScreen from "./screens/home";
import LoginScreen from "./screens/login";
import RegisterScreen from "./screens/register";

const defaultRoutes = [
  {
    path: "/home",
    component: HomeScreen
  },
  {
    path: "/login",
    component: LoginScreen
  },
  {
    path: "/home/:id",
    component: HomeScreen
  }
];
const authRoutes = [
  {
    path: "/login",
    component: LoginScreen
  },
  {
    path: "/register",
    component: RegisterScreen
  },
  {
    path: "/home/:id",
    component: HomeScreen
  }
];
export { defaultRoutes, authRoutes };
