/* eslint-disable react/prop-types */

import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';
import { collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Title, Container } from '../components/CommonStyles';

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
      </>
  )
}

const ChatMessage = ( props ) => {
  const { text } = props.message;

  return <p>{text}</p>
}

function Home() {
  const [ user ] = useAuthState(auth);
  return (
    <>
      {!user && (<Navigate to={'/Login'} replace={true} />)}
      <Container>
        <Title>主頁</Title>
        <h2>聊天室</h2>
        <Chatroom />
      </Container>

    </>
  )
}
  
  export default Home
  