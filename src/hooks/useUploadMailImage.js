import { useCallback, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../utils/firebase/firebase';
import { useUserDataContext } from './context/useUserDataContext';

export const useUploadMailImage = () => {
  const { userData } = useUserDataContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const uploadMailImage = useCallback(
    async (file) => {
      if (!file) return;

      setLoading(true);
      setError(null);
      const { mailBoxID } = userData;

      if (!mailBoxID) {
        setError('郵箱ID不存在');
        setLoading(false);
        return;
      }

      const timestamp = Math.floor(Date.now() / 1000);
      const storageRef = ref(storage, `${mailBoxID}/${timestamp}`);

      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setImageUrl(url);
        return url;
      } catch (err) {
        setError('上傳郵件圖片失敗');
      } finally {
        setLoading(false);
      }
    },
    [userData]
  );

  return { uploadMailImage, imageUrl, loading, error };
};
