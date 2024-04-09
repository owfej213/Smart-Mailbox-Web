/* eslint-disable react/prop-types */

import { useState } from 'react';
import { auth, db } from '../firebase/firebase';
import { collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Title, Container, Box } from '../components/CommonStyles';
import { useAuthState } from 'react-firebase-hooks/auth';
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
      <Container>
        <Title>主頁</Title>
        <Box
          fontWeight="bold"
        >
          <Box
            bg="box"
            width="100%"
            maxWidth="250px"
            mx="10px"
            py="10px"
            borderRadius="5px"
            flexDirection="column"
          >
            <Box
              mx= "auto"
              mb="10px"
              fontSize= {[1, 2]}
              textAlign= "center"
            >
              登入狀態
            </Box>
            <Box
              ml="10px"
              fontSize={[0, 1]}
              flexDirection="column"
            >
              <Box>
                名稱：{user.displayName}
              </Box>
              <Box>
                身分：住戶
              </Box>
            </Box>
          </Box>
          <Box
            bg="box"
            width="100%"
            maxWidth="750px"
            mx="10px"
            py="10px"
            borderRadius="5px"
          >
            <Box
              mx= "auto"
              fontSize= {[0, 1, 2]}
              textAlign= "center"
            >
              總覽
            </Box>
          </Box>
        </Box>
        
        {/* <Chatroom /> */}
      </Container>

    </>
  )
}

export default Home;