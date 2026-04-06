import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login Page/Login";
import Register from "./pages/Register Page/Register";
import Dashboard from "./pages/Dashboard Page/DashBoard";
import { GuestGuard } from "./components/Guards/GuestGuard";
import { UserGuard } from "./components/Guards/UserGuard";

export const routes = [
  { path: "/", element: (<GuestGuard><Login /></GuestGuard>) },
  { path: "/register", element: (<GuestGuard><Register /></GuestGuard>) },
  { path: "/dashboard", element: (<UserGuard> <Dashboard /></UserGuard>) },
  { path: '*', element: <Navigate to="/dashboard" /> }
];

const router = createBrowserRouter(routes);
export default router;