import { useState, useLayoutEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../utils/firebase/firebase';
import { useAuthContext } from '../../hooks/context/useAuthContext';
import UserDataContext from './UserDataContext';
import PropTypes from 'prop-types';

export function UserDataProvider({ children }) {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isUserDataExist, setIsUserDataExist] = useState(true);
  const [isMailBoxIdDefault, setIsMailBoxIdDefault] = useState(false);
  const [isUserNameDefault, setIsUserNameDefault] = useState(false);

  useLayoutEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user?.uid !== null) {
          const userDoc = doc(db, `users/${user?.uid}`);

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
    setLoading(false);
  }, [user]);

  async function initializeUserData(result) {
    if (result.exists()) {
      setUserData(result.data());
      setIsMailBoxIdDefault(result.data().mailBoxID === 'Example');
      setIsUserNameDefault(result.data().userName === 'Example');
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
    isMailBoxIdDefault,
    isUserNameDefault,
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
