import { useEffect } from 'react';
import { useUserDataContext } from '../../hooks/context/useUserDataContext';
import { Status, showToaster } from '../../utils/showToast';

export function DefaultUserDataToaster() {
  const { isMailBoxIdDefault, isUserNameDefault } = useUserDataContext();

  useEffect(() => {
    if (isMailBoxIdDefault) {
      queueMicrotask(() => {
        showToaster(
          Status.WARNING,
          '郵箱ID為預設值',
          '請先在個人設定中更改郵箱ID！'
        );
      });
    }
  }, [isMailBoxIdDefault]);

  useEffect(() => {
    if (isUserNameDefault) {
      queueMicrotask(() => {
        showToaster(
          Status.WARNING,
          '使用者名稱為預設值',
          '請先在個人設定中更改使用者名稱！'
        );
      });
    }
  }, [isUserNameDefault]);
  return null;
}
