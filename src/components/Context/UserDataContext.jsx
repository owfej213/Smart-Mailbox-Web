import { useContext, useState, useEffect, createContext } from "react";
import { db } from "../../firebase/firebase";
import PropTypes from "prop-types";
import { useAuth } from "./AuthContext";
import { doc, onSnapshot } from "firebase/firestore";

const UserDataContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useUserData() {
  return useContext(UserDataContext);
}

export function UserDataProvider({ children }) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isUserDataExist, setIsUserDataExist] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (currentUser !== null) {
          const userDoc = doc(db, `users/${currentUser.uid}`);

          //監聽使用者資料
          const unsubscribe = onSnapshot(userDoc, initializeUserData);
          //取消訂閱listener
          return unsubscribe;
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [currentUser]);

  async function initializeUserData(result) {
    if (result.exists()) {
      setUserData(result.data());
      setIsUserDataExist(true);
    } else {
      setUserData(null);
      setIsUserDataExist(false);
    }
    setLoading(false);
  }

  const value = {
    userData,
    isUserDataExist,
  };

  return (
    <UserDataContext.Provider value={value}>
      {!loading && children}
    </UserDataContext.Provider>
  );
}

UserDataProvider.propTypes = {
  children: PropTypes.any,
};
