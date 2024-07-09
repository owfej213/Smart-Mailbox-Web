import { useContext, useState, useEffect, createContext } from "react";
import { db } from "../../firebase/firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useUserData } from "./UserDataContext";
import PropTypes from "prop-types";

const MailsDataContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useMailsData() {
  return useContext(MailsDataContext);
}

export function MailsDataProvider({ children }) {
  const { userData } = useUserData();
  const { mailBoxID } = userData || {};

  const [mailsData, setMailsData] = useState([]);
  const [mailsDataCount, setMailsDataCount] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mailClasses, setMailClasses] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (mailBoxID !== null) {
          const mailBoxRef = collection(
            doc(db, `mailBoxes/${mailBoxID}`),
            "mails"
          );

          //監聽郵箱資料
          const unsubscribe = onSnapshot(mailBoxRef, initializeMailsData);
          //取消訂閱listener
          return unsubscribe;
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
    setLoading(false);
  }, [mailBoxID]);

  async function initializeMailsData(result) {
    if (result) {
      //將資料轉成array
      const mails = result.docs
        .map((item) => {
          let items = item.data();
          //firebase文件ID當作是郵件ID
          items["uid"] = item.id;

          return items;
        })
        .sort((a, b) => {
          if (!a?.createAt?.seconds || !b?.createAt?.seconds) return 0;
          return b.createAt.seconds - a.createAt.seconds;
        });
      setMailsDataCount(mails.length);
      setMailsData(mails);
      mails.forEach((mail) => {
        if (mail?.type !== undefined && mail?.type !== "") {
          setMailClasses((prevState) => ({
            ...prevState,
            [mail?.type]: prevState[mail?.type] ? prevState[mail?.type] + 1 : 1,
          }));
        }
      });
    }
    setLoading(false);
  }

  const value = {
    mailsData,
    mailsDataCount,
    mailClasses,
  };

  return (
    <MailsDataContext.Provider value={value}>
      {!loading && children}
    </MailsDataContext.Provider>
  );
}

MailsDataProvider.propTypes = {
  children: PropTypes.any,
};
