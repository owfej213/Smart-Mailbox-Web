import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../hooks/context/useAuthContext';

// PrivateRoute component checks if the user is logged in.
const PrivateRoute = () => {
  const { userLoggedIn } = useAuthContext();

  return userLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
