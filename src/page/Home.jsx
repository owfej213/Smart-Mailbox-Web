/* eslint-disable react/prop-types */
import styled from '@emotion/styled';
import { auth } from '../firebase/firebase';
import { Title, Wrapper, Box, TextBox, SpanBox } from '../components/CommonStyles';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../firebase/firebase';
import { Link } from 'react-router-dom';

const ContentWrapper = styled(Box)``;

ContentWrapper.defaultProps = {
  width:[1/2, 1],
  mx:"5px",
  borderRadius:"2px",
  flexDirection:"column",
}

const SideBarBox = styled(Box)``;

SideBarBox.defaultProps = {
  bg:"box",
  mb:"10px",
  py:"10px",
  borderRadius:"2px",
  flexDirection:"column",
}

const SubTitle = styled(Box)``;

SubTitle.defaultProps = {
  mx:"auto",
  mb:"10px",
  fontSize:[1, 2],
  textAlign:"center",
}

const Detail = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors.text3};
  &:hover{
    color: ${props => props.theme.colors.text};
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

const List = () => {
  //提取集合
  const messageRef = collection(db, 'mails');
  //提取資料(集合, 依照createAt(時間)排序)
  const q = query(messageRef, orderBy('createAt'), limit(10));
  //Hook監聽資料
  const [ mails ] = useCollectionData(q, { idField: 'id' });
  return (
    <>
      { mails && mails.map((msg, index) => {
          return (
            <TextBox
              key={ index }
              display="block"
              mb="5px"
              alignItems="center"
            >
              <Detail to={`/home/history/${msg.uuid}`}>
                <TextBox mx="5px">
                  <SpanBox
                    fontSize={[1]}
                    fontWeight="bolder"
                  >
                    你有一封新信件：{msg.title}
                  </SpanBox>
                  <SpanBox
                    color="text2"
                    fontSize={[0]}
                  >
                    -{calculateTimeDifference( msg.createAt.toDate(), new Date())}
                  </SpanBox>
                </TextBox>
              </Detail>
            </TextBox>
          )
        })
      }
    </>
  )
}

function Home() {
  const [ user ] = useAuthState(auth);

  var userName = user ? user.displayName : "未知";

  return (
    <>
      <Wrapper>
        <Title fontSize={[3, 4, 5, 6]}>主頁</Title>
        <Box fontWeight="bold" maxwidth="800px" mx="auto" justifyContent="center">
          <ContentWrapper maxWidth="300px">
            <SideBarBox>
              <SubTitle>
                登入狀態
              </SubTitle>
              <Box
                ml="10px"
                fontSize={[0, 1]}
                flexDirection="column"
              >
                <Box>
                  名稱：{userName}
                </Box>
                <Box>
                  身分：住戶
                </Box>
              </Box>
            </SideBarBox>
            <SideBarBox>
              <SubTitle>
                家庭成員
              </SubTitle>
            </SideBarBox>
          </ContentWrapper>
          <ContentWrapper maxWidth="500px">
            <SideBarBox>
              <SubTitle>
                通知
              </SubTitle>
              <Box
                mx="auto"
                fontSize={[0, 1]}
                flexDirection="column"
              >
                <List />
              </Box>
            </SideBarBox>
          </ContentWrapper>
        </Box>
      </Wrapper>

    </>
  )
}

export default Home;