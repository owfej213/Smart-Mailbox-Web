import { useContext } from 'react';
import MailsDataContext from '../components/context/MailsDataContext';

export function useMailsDataContext() {
  const context = useContext(MailsDataContext);

  if (!context) {
    throw new Error(
      'useMailsDataContext must be used within a MailsDataProvider'
    );
  }

  return context;
}
