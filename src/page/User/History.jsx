import styled from '@emotion/styled';
import Wrapper from '../../components/layout/Wrapper';
import Box from '../../components/ui/Box';
import { auth, db } from '../../firebase/firebase';
import { collection, query, orderBy, addDoc, serverTimestamp, getDoc, doc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { useAuthState } from 'react-firebase-hooks/auth';

TableItem.propTypes = {
  data: PropTypes.any,
  children: PropTypes.any
}

function TableItem({ data, children, ...prop}){
  return (
    <Box
      justifyContent={"center"}
      fontWeight={"bold"}
      mx={1}
      p={2}
      bg={"secondary-background"}
      { ...prop }
    >
      {data}
      {children}
    </Box>
  )
}

const Detail = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors['primary-text-link']};
  &:hover{
    color: ${props => props.theme.colors['primary-text-link-light']};
  }
`;

//Chat-GPT寫的，回傳現在年月日
const Today = () => {
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1;
  var day = currentDate.getDate();

  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  var dateString = year + '年' + month + '月' + day + '日';
  return dateString;
}

const List = ({ mails }) => {

  return (
    <>
      { mails && mails.map((msg, index) => {
          return (
            <Box
              key={ index }
              mb="5px"
              fontSize={[0, 1, 2, 3]}
            >
              <TableItem
                maxWidth={"350px"}
                width={[1/2, 1]}
                data={msg.date}
              />
              <TableItem
                maxWidth={"200px"}
                width={[1/2, 1]}
                data={msg.title}
              />
              <TableItem
                maxWidth={"150px"}
                width={[1/2, 1]}
                data={msg.type}
              />
              <TableItem
                maxWidth={"150px"}
                width={[1/2, 1]}
                data={msg.name}
              />
              <TableItem
                maxWidth={"150px"}
                width={[1/2, 1]}
                color={"primary-text-link"}
              >
                <Detail to={`/home/history/${msg.uuid}`}>
                  查看
                </Detail>
              </TableItem>
            </Box>
          )
        })
      }
    </>
  )
}

List.propTypes = {
  mails: PropTypes.array,
}

function History() {
  const [ user ] = useAuthState(auth);
  const [ formValue, setFormValue ] = useState('');
  const [ userData, setUserData ] = useState(null);
  const [ mailsQuery, setMailQuery ] = useState(null);
  const [ messageRef, setMessageRef ] = useState(null);
  //Hook監聽資料
  const [ mails ] = useCollectionData(mailsQuery, { idField: 'id' });

  useEffect(() => {
    if(userData !== null){
      //提取集合
      const messageRef = collection(doc(db, `mail/${userData.mailID}`), 'mails');

      setMessageRef(messageRef);

      //提取資料(集合, 依照createAt(時間)排序)
      const q = query(messageRef, orderBy('createAt'));

      setMailQuery(q);
    }
  }, [userData])

  useEffect(() => {
    const fetchUserData = async() => {
      if(user !== null) {
        const userDoc = doc(db, `users/${user.uid}`);

        try {
          const result = await getDoc(userDoc);

          setUserData(result.data());

        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchUserData();
  }, [])

  const sendMessage = async (e) => {
    e.preventDefault();

    var word = formValue.split(' ');

    //新增資料(集合, {資料格式})
    await addDoc(messageRef, {
        date: Today(),
        title: word[0],
        type: word[1],
        name: word[2],
        createAt: serverTimestamp(),
        uuid: uuidv4(),
    });

    setFormValue('');
  }
  return (
    <>
      <Wrapper title="歷史紀錄">

        <Box
          mb="10px"
          fontSize={[1, 2, 3, 4]}
        >
          <TableItem
            maxWidth={"350px"}
            width={[1/2, 1]}
            data="日期"
          />
          <TableItem
            maxWidth={"200px"}
            width={[1/2, 1]}
            data="郵件主題"
          />
          <TableItem
            maxWidth={"150px"}
            width={[1/2, 1]}
            data="類型"
          />
          <TableItem
            maxWidth={"150px"}
            width={[1/2, 1]}
            data="收信人"
           />
          <TableItem
            maxWidth={"150px"}
            width={[1/2, 1]}
            data="細節"
          />
        </Box>
        <List mails={mails} />
        <form onSubmit={sendMessage}>
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
          <button type='submit'>發送</button>
        </form>
      </Wrapper>
    </>
  )
}

export default History;