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
  const [loading, setLoading] = useState(true);

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
      const mails = result.docs.map((item) => {
        let items = item.data();
        //firebase文件ID當作是郵件ID
        items["uid"] = item.id;

        return items;
      });

      setMailsData(mails);
    }
    setLoading(false);
  }

  const value = {
    mailsData,
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
