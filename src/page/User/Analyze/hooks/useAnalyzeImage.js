import { useCallback, useState } from 'react';
import { useAuthContext } from '../../../../hooks/context/useAuthContext';

export function useAnalyzeImage() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const uploadImage = useCallback(
    async (file, mailBoxID) => {
      setLoading(true);
      setResult('');

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('mailBoxID', mailBoxID);

        const idToken = await user.getIdToken();

        const response = await fetch(import.meta.env.VITE_IMAGE_ANALYZE_URL, {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          const message = `伺服器錯誤: ${response.status} ${data.error}`;
          setError(message);
          return {
            success: false,
            error: message,
          };
        }

        setResult(data);
        return {
          success: true,
          data,
        };
      } catch (error) {
        const message = `上傳圖片失敗: ${error.message}`;
        setError(message);
        return {
          success: false,
          error: message,
        };
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  return { uploadImage, loading, result, error };
}
