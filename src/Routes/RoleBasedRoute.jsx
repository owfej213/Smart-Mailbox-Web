import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useUserDataContext } from '../hooks/useUserDataContext';

const RoleBasedRoute = ({ allowedRoles }) => {
  const { userData } = useUserDataContext();
  const { userRole } = userData || {};

  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/" />;
};
RoleBasedRoute.propTypes = {
  allowedRoles: PropTypes.array,
};

export default RoleBasedRoute;
