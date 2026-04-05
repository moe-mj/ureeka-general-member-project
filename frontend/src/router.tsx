import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login Page/Login";
import Register from "./pages/Register Page/Register";
import Dashboard from "./pages/Dashboard Page/DashBoard";

export const routes = [
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/dashboard", element: <Dashboard /> }
];

const router = createBrowserRouter(routes);
export default router;