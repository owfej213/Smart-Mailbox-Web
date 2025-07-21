import { useState, useEffect } from 'react';
import { db } from '../../utils/firebase/firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { useUserDataContext } from '../../hooks/context/useUserDataContext';
import MailsDataContext from './MailsDataContext';
import PropTypes from 'prop-types';

export function MailsDataProvider({ children }) {
  const { userData } = useUserDataContext();
  const { mailBoxID } = userData || {};

  const [mailsData, setMailsData] = useState([]);
  const [mailsDataCount, setMailsDataCount] = useState(0);
  const [mailBoxRef, setMailBoxRef] = useState(null);

  useEffect(() => {
    if (!mailBoxID) return;

    const ref = collection(doc(db, `mailBoxes/${mailBoxID}`), 'mails');
    setMailBoxRef(ref);

    const unsubscribe = onSnapshot(ref, initializeMailsData);

    return () => unsubscribe(); // 確保監聽被清除
  }, [mailBoxID]);

  async function initializeMailsData(result) {
    if (result.empty) {
      setMailsData([]);
      setMailsDataCount(0);
      return;
    }

    const mails = result.docs
      .map((item) => {
        let items = item.data();
        items['uid'] = item.id;

        return {
          ...items,
          createAt: items.createAt?.seconds || 0, // 確保 createAt 不會報錯
        };
      })
      .sort((a, b) => b.createAt - a.createAt); // 按照時間排序

    setMailsData(mails);
    setMailsDataCount(mails.length);
  }

  const value = {
    mailsData,
    mailsDataCount,
    mailBoxRef,
  };

  return (
    <MailsDataContext.Provider value={value}>
      {children}
    </MailsDataContext.Provider>
  );
}

MailsDataProvider.propTypes = {
  children: PropTypes.any,
};
