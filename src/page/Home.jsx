import styled from '@emotion/styled';
import { auth } from '../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, orderBy, limit, getDoc, doc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../firebase/firebase';
import { Link } from 'react-router-dom';
import Wrapper from '../components/layout/Wrapper';
import SideBar from '../components/layout/SideBar';
import SideBarItem from '../components/layout/SideBarItem';
import Content from '../components/layout/Content';
import Box from '../components/ui/Box';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Detail = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors['primary-text-link']};
  &:hover{
    color: ${props => props.theme.colors['primary-text-link-light']};
  }
`;

function calculateTimeDifference(start, end) {
  var difference = Math.abs(end - start);
  var daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
  var hoursDifference = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutesDifference = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  if (daysDifference > 0) {
      return daysDifference + "天前";
  } else if (hoursDifference > 0) {
      return hoursDifference + "小時前";
  } else {
      return minutesDifference + "分鐘前";
  }
}

const List = ({ mails }) => {
  return (
    <>
      { mails && mails.map((msg, index) => {
          return (
            <Box
              key={ index }
              mb={2}
            >
              <Detail to={`/home/history/${msg.uuid}`}>
                <Box 
                  as="span"
                  fontSize={[1]}
                  fontWeight={"bolder"}
                >
                  你有一封新信件：{msg.title}
                </Box>
                <Box
                  as="span"
                  color={"secondary-text"}
                  fontSize={[0]}
                >
                   - {calculateTimeDifference( msg.createAt.toDate(), new Date())}
                </Box>
              </Detail>
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

function Home() {
  const [ user ] = useAuthState(auth);
  const [ userData, setUserData ] = useState(null);
  const [ userNickName, setUserNickName ] = useState("");
  const [ userType, setUserType ] = useState("");
  const [ mailsQuery, setMailQuery ] = useState(null);
  //Hook監聽資料
  const [ mails ] = useCollectionData(mailsQuery, { idField: 'id' });

  useEffect(() => {
      if(userData !== null){
        //提取集合
        const messageRef = collection(doc(db, `mail/${userData.mailID}`), 'mails');
        //提取資料(集合, 依照createAt(時間)排序)
        const q = query(messageRef, orderBy('createAt'), limit(10));

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

          setUserNickName(userData.userNickName);

          setUserType(userData.userType);

        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchUserData();
  }, [user, userData])
  
  return (
    <>
      <Wrapper title="主頁">
        <Box justifyContent={"center"}>
          <SideBar maxWidth={"300px"}>
            <SideBarItem title="登入狀態">
                <span>名稱：{userNickName}</span>
                <span>身分：{userType}</span>
            </SideBarItem>
            <SideBarItem title="家庭成員">
            </SideBarItem>
          </SideBar>
          <Content maxWidth={"500px"} bg={"secondary-background"} title="通知">
            <Box flexDirection={"column"} mx={"auto"}>
              <List mails={mails}/>
            </Box>
          </Content>
          </Box>
      </Wrapper>

    </>
  )
}

export default Home;