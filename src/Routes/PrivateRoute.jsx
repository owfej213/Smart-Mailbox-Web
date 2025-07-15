import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const PrivateRoute = () => {
  const { userLoggedIn } = useAuthContext();

  return userLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
