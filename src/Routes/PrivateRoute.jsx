import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/Context/AuthContext";

const PrivateRoute = () => {
  const { userLoggedIn } = useAuth();

  return (
    userLoggedIn ? <Outlet /> : <Navigate to="/login" />
  );
};

export default PrivateRoute;
