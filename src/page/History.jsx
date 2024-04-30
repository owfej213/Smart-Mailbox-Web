import styled from '@emotion/styled';
import { Title, Wrapper, Box } from '../components/CommonStyles';
import { db } from '../firebase/firebase';
import { collection, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
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

const Component = styled(Box)`
  justify-content: center;
  font-weight: bold;
`;

Component.defaultProps = {
  mx: "3px",
  p: "10px",
  bg: "box",
}

const Detail = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors.text};
  &:hover{
    color: ${props => props.theme.colors.text3};
  }
`;

const List = () => {
  const [ formValue, setFormValue ] = useState('');
  //提取集合
  const messageRef = collection(db, 'mails');
  //提取資料(集合, 依照createAt(時間)排序)
  const q = query(messageRef, orderBy('createAt'));
  //Hook監聽資料
  const [ mails ] = useCollectionData(q, { idField: 'id' });
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
      { mails && mails.map((msg, index) => {
          return (
            <Box 
              key={ index }
              mb="5px"
              fontSize={[0, 1, 2, 3]}
            >
              <Component flexBasis="35%">
                <span>{msg.date}</span>
              </Component>
              <Component flexBasis="20%">
                <span>{msg.title}</span>
              </Component>
              <Component flexBasis="15%">
                <span>{msg.type}</span>
              </Component>
              <Component flexBasis="15%">
                <span>{msg.name}</span>
              </Component>
              <Component flexBasis="15%" color="primary">
                <Detail to={`/home/history/${msg.uuid}`}>
                  查看
                </Detail>
              </Component>
            </Box>
          )
        })
      }
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type='submit'>發送</button>
      </form>
    </>
  )
}

function History() {

  return (
    <>
      <Wrapper>
        <Title fontSize={[3, 4, 5, 6]}>歷史紀錄</Title>
        <Box 
          mb="10px"
          fontSize={[1, 2, 3, 4]}
        >
          <Component flexBasis="35%">
            <span>日期</span>
          </Component>
          <Component flexBasis="20%">
            <span>郵件主題</span>
          </Component>
          <Component flexBasis="15%">
            <span>類型</span>
          </Component>
          <Component flexBasis="15%">
            <span>收信人</span>
          </Component>
          <Component flexBasis="15%">
            <span>細節</span>
          </Component>
        </Box>
        <List />
      </Wrapper>
    </>
  )
}

export default History;