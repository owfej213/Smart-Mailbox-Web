import { useContext } from 'react';
import AuthContext from '../../components/context/AuthContext';

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }

  return context;
}
