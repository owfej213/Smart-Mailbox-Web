import { getApp, getApps, initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

// Firebase 驗證初始化
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: 'smartmailbox-8513f.firebaseapp.com',
  projectId: 'smartmailbox-8513f',
  storageBucket: 'smartmailbox-8513f.appspot.com',
  messagingSenderId: '716234232138',
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: 'G-VPGMP96W5V',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 初始化Auth 和 FireStore 實例
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// 開發模式使用 Emulator
if (import.meta.env.MODE === 'localhost') {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectStorageEmulator(storage, 'localhost', 9199);
  connectAuthEmulator(auth, 'http://localhost:9099', {
    disableWarnings: true,
  });
}

export { app, auth, db, storage };
