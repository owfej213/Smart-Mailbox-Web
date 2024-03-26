import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

//Firebase驗證初始化
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "smartmailbox-8513f.firebaseapp.com",
  projectId: "smartmailbox-8513f",
  storageBucket: "smartmailbox-8513f.appspot.com",
  messagingSenderId: "716234232138",
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: "G-VPGMP96W5V"
};
const app = initializeApp(firebaseConfig);

//初始化Auth和FireStore實例
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
