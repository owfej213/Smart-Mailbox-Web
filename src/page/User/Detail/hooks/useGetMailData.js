import { useEffect, useState } from 'react';
import { useMailsDataContext } from '../../../../hooks/context/useMailsDataContext';
import { useParams } from 'react-router-dom';

export function useGetMailData() {
  const { id } = useParams();
  const { mailsData } = useMailsDataContext();
  const [maildata, setMaildata] = useState({});

  useEffect(() => {
    setMaildata(() => {
      return mailsData.find((mail) => mail.uid === id) || {};
    });
  }, [id, mailsData]);

  return {
    maildata,
  };
}
