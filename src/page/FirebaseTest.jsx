import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Button } from '../components/Common';

//Firebase驗證初始化
const app = initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "smartmailbox-8513f.firebaseapp.com",
    projectId: "smartmailbox-8513f",
    storageBucket: "smartmailbox-8513f.appspot.com",
    messagingSenderId: "716234232138",
    appId: import.meta.env.VITE_FIREBASE_APPID,
    measurementId: "G-VPGMP96W5V"
});
//初始化Auth和FireStore實例
const auth = getAuth(app);
const db = getFirestore(app);

const Chatroom = () => {
    const [ formValue, setFormValue ] = useState('');
    //提取集合
    const messageRef = collection(db, 'message');
    //提取資料(集合, 依照createAt(時間)排序, 最多25比)
    const q = query(messageRef, orderBy('createAt'), limit(25));
    //Hook監聽資料
    const [ message ] = useCollectionData(q, { idField: 'id' });

    const sendMessage = async (e) => {

        e.preventDefault();

        const { uid } = auth.currentUser;
        //新增資料(集合, {資料格式})
        await addDoc(messageRef, {
            text: formValue,
            createAt: serverTimestamp(),
            uid
        });

        setFormValue('');
    }

    return (
        <>
            <div>
                { message && message.map( (msg) => <ChatMessage key={ msg.id } message={ msg } />)}
            </div>

            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
                <button type='submit'>發送</button>
            </form>
            <SignOut />
        </>
    )
}

const ChatMessage = ( props ) => {
    const { text, uid } = props.message;

    return <p>{text}</p>
}

const SignIn = () => {
    //彈出Google登入框
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    }
    return (
        <Button isGoogleButton={true} onClick={ signInWithGoogle }>
            Google 登入
        </Button>
    )
}

function SignOut() {
    return (
        <Button isGoogleButton={true} onClick={() => signOut(auth) }>
            Google 登出
        </Button>
    )
}

function FirebaseTest() {
    const [ user ] = useAuthState(auth);
    
    return (
      <>
        <section> 
            { user ? <Chatroom /> : <SignIn /> }
        </section>
      </>
    )
}
  
  export default FirebaseTest;
  