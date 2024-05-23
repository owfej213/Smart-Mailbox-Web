import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { useUserData } from "../components/Context/UserDataContext";

const RoleBasedRoute = ({ allowedRoles }) => {
  const { userData } = useUserData();
  const { userRole } = userData || {};

  return (
        allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/" />
  );
};
RoleBasedRoute.propTypes = {
  allowedRoles: PropTypes.array,
};

export default RoleBasedRoute;
