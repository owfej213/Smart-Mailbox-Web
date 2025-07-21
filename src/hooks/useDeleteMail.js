import { useCallback, useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { useMailsDataContext } from './context/useMailsDataContext';

export function useDeleteMail() {
  const { mailBoxRef } = useMailsDataContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteMail = useCallback(
    async (uid) => {
      if (!uid) return;

      setLoading(true);
      setError(null);

      try {
        const docRef = doc(mailBoxRef, uid);
        await deleteDoc(docRef);
      } catch (error) {
        setError('Delete Mail failed');
      } finally {
        setLoading(false);
      }
    },
    [mailBoxRef]
  );

  return { loading, error, deleteMail };
}
