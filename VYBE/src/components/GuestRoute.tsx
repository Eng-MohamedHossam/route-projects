import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/useAuth";

function GuestRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}

export default GuestRoute;
