import { useCallback, useState } from 'react';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { useMailsDataContext } from './context/useMailsDataContext';

export const useUploadMailData = () => {
  const { mailBoxRef } = useMailsDataContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadMailData = useCallback(
    async (file, imageUrl) => {
      if (!file) return;
      console.log('Uploading mail data:', file, imageUrl);
      setLoading(true);
      setError(null);

      const mailData = {
        ...file,
        createAt: serverTimestamp(),
        imageUrl,
      };

      try {
        await addDoc(mailBoxRef, mailData);
      } catch (error) {
        setError('上傳郵件數據失敗');
      } finally {
        setLoading(false);
      }
    },
    [mailBoxRef]
  );

  return { uploadMailData, loading, error };
};
