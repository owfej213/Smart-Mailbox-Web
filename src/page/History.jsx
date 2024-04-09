import styled from 'styled-components';
import { Title, Container } from '../components/CommonStyles';
import { db } from '../firebase/firebase';
import { collection, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState } from 'react';
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

const Table = styled.div`
  margin-bottom: 0.1em;
  display: flex;
  font-size: 2em;
`
const Header = styled(Table)`
  margin-bottom: 0.5em;
`

const Content = styled(Table)`
  margin-bottom: 5px;
  font-size: 1.5em;
`

const Component = styled.div`
  margin: 0 3px;
  padding: 0.4em;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(217, 217, 217);
  font-weight:bold;
`

const Detail = styled(Component)`
  color: rgb(72, 186, 251);
`

const List = () => {
  const [ formValue, setFormValue ] = useState('');
  //提取集合
  const messageRef = collection(db, 'mails');
  //提取資料(集合, 依照createAt(時間)排序)
  const q = query(messageRef, orderBy('createAt'));
  //Hook監聽資料
  const [ mails ] = useCollectionData(q, { idField: 'id' });
  console.log(mails)
  const sendMessage = async (e) => {

    e.preventDefault();

    var word = formValue.split(' ');

    //新增資料(集合, {資料格式})
    await addDoc(messageRef, {
        title: word[0],
        type: word[1],
        name: word[2],
        createAt: serverTimestamp(),
    });

    setFormValue('');
  }

  return (
    <>
      { mails && mails.map((msg) => {
          return (
            <Content key={ msg.id }>
              <Component style={{flexBasis: '35%'}}>
                <span>{new Date(msg.createAt.seconds * 1000).toLocaleString()}</span>
              </Component>
              <Component style={{flexBasis: '20%'}}>
                <span>{msg.title}</span>
              </Component>
              <Component style={{flexBasis: '15%'}}>
                <span>{msg.type}</span>
              </Component>
              <Component style={{flexBasis: '15%'}}>
                <span>{msg.name}</span>
              </Component>
              <Detail style={{flexBasis: '15%'}}>
                <span>查看</span>
              </Detail>
            </Content>
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
      <Container>
        <Title>歷史紀錄</Title>
        <Header>
          <Component style={{flexBasis: '35%'}}>
            <span>日期</span>
          </Component>
          <Component style={{flexBasis: '20%'}}>
            <span>郵件主題</span>
          </Component>
          <Component style={{flexBasis: '15%'}}>
            <span>類型</span>
          </Component>
          <Component style={{flexBasis: '15%'}}>
            <span>收信人</span>
          </Component>
          <Component style={{flexBasis: '15%'}}>
            <span>細節</span>
          </Component>
        </Header>
        <List />
      </Container>
    </>
  )
}

export default History;