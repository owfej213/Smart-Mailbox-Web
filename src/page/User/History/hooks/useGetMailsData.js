import { useEffect, useMemo, useState } from 'react';
import { useMailsDataContext } from '../../../../hooks/useMailsDataContext';
import { useUserDataContext } from '../../../../hooks/useUserDataContext';

export function useGetMailsData() {
  const { mailsData } = useMailsDataContext();
  const { userData } = useUserDataContext();
  const [newMail, setNewMail] = useState(null);
  const [filteredMails, setFilteredMails] = useState(null);
  const [isOnlyShowMyMail, setIsOnlyShowMyMail] = useState(false);

  const mails = useMemo(() => {
    return mailsData.map((mail) => {
      const currentTime = Date.now() / 1000;
      return {
        ...mail,
        view: {
          isNew: currentTime - mail.createAt < 300,
          isMine: mail.receiver === userData.userRealName,
        },
      };
    });
  }, [mailsData, userData]);

  // 根據條件過濾郵件
  useEffect(() => {
    setFilteredMails(() => {
      return isOnlyShowMyMail
        ? mails.filter((mail) => mail.view.isMine)
        : mails;
    });
  }, [mails, isOnlyShowMyMail]);

  // 更新最新的郵件
  useEffect(() => {
    const latestMail = mails.find((mail) => mail.view.isNew);
    if (latestMail) {
      setNewMail(latestMail);
    }
  }, [mails]);

  return { mails, filteredMails, newMail, setIsOnlyShowMyMail };
}
