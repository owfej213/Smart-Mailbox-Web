import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../utils/firebase/firebase';
import { useCallback, useState } from 'react';
import { useUserDataContext } from './useUserDataContext';

export function useDeleteMail() {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const { userData } = useUserDataContext();

  const deleteMail = useCallback(
    async (uid) => {
      setIsloading(true);
      setError(null);

      try {
        const result = doc(
          collection(doc(db, `mailBoxes/${userData.mailBoxID}`), 'mails'),
          uid
        );
        await deleteDoc(result);
      } catch (error) {
        console.log(error);
        setError('DeleteMail failed');
      } finally {
        setIsloading(false);
      }
    },
    [userData]
  );

  return { isLoading, error, deleteMail };
}
