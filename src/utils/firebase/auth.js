import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from 'firebase/auth';
//創建新用戶資料
export const userDataInitial = async (userCredential) => {
  const userDocRef = doc(db, `users/${userCredential.user.uid}`);

  await setDoc(userDocRef, {
    userName: 'Example',
    userRealName: '',
    userRole: 'user',
    email: userCredential.user.email,
    mailBoxID: 'Example',
  });
};

export const doCreateUserWithEmailAndPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithUserName = async (userName, password) => {
  const userDoc = query(
    collection(db, 'users'),
    where('userName', '==', userName)
  );
  const QuerySnapshot = await getDocs(userDoc);
  let email = '';
  if (!QuerySnapshot.empty) email = QuerySnapshot.docs[0].data().email;

  return doSignInWithEmailAndPassword(email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);

  const AdditionalUserInfo = getAdditionalUserInfo(userCredential);

  if (AdditionalUserInfo.isNewUser) userDataInitial(userCredential);

  return userCredential;
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};
