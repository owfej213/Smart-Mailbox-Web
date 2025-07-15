import { useContext } from 'react';
import UserDataContext from '../components/context/UserDataContext';

export function useUserDataContext() {
  const context = useContext(UserDataContext);

  if (!context) {
    throw new Error('UserDataContext must be used within a UserDataProvider');
  }

  return context;
}
