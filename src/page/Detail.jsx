import { Title, Wrapper, Box } from '../components/CommonStyles';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { db } from '../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const ContentWrapper = styled(Box)``;

ContentWrapper.defaultProps = {
  width:[1/2, 1],
  mx:"5px",
  borderRadius:"3px",
  flexDirection:"column",
}

const SectionBox = styled(Box)``;

SectionBox.defaultProps = {
  bg:"box",
  mb:"20px",
  py:"10px",
  borderRadius:"3px",
  flexDirection:"column",
}

const SubTitle = styled(Box)``;

SubTitle.defaultProps = {
  mx:"auto",
  mb:"10px",
  fontSize:[1, 2],
  textAlign:"center",
}

function Detail() {
  const [ maildata, setMaildata ] = useState({});

  const { id } = useParams();

  useEffect(() => {
    //提取集合
    const messageRef = collection(db, 'mails');
    //提取資料
    const q = query(messageRef, where("uuid", "==", id));
    console.log(q)
    getDocs(q).then(function(querySnapshot){
      querySnapshot.forEach((doc) => {
        setMaildata(doc.data());
      })
    }).catch((err) => console.log(err))
  }, [id]);

  return (
    <>
      <Wrapper>
        <Title fontSize={[3, 4, 5, 6]}>郵件細節</Title>
        <Box fontWeight="bold" maxwidth="800px" mx="auto" justifyContent="center">
          <ContentWrapper maxWidth="600px">
              <SectionBox>
                <SubTitle>
                  基本資訊
                </SubTitle>
                <Box
                  ml="10px"
                  fontSize={[0, 1]}
                  flexDirection="column"
                >
                  <Box>
                    送達日期：{maildata.date}
                  </Box>
                  <Box>
                    信件主題：{maildata.title}
                  </Box>
                  <Box>
                    類型：{maildata.type}
                  </Box>
                  <Box>
                    收信人：{maildata.name}
                  </Box>
                </Box>
              </SectionBox>
              <SectionBox>
                <SubTitle>
                  進階資訊
                </SubTitle>
                <Box
                  ml="10px"
                  fontSize={[0, 1]}
                  flexDirection="column"
                >
                  <Box>
                    寄送人：
                  </Box>
                  <Box>
                    寄送單位：
                  </Box>
                  <Box>
                    寄送單位地址：
                  </Box>
                </Box>
              </SectionBox>
              <SectionBox>
                <SubTitle>
                  額外資訊
                </SubTitle>
                <Box
                  ml="10px"
                  fontSize={[0, 1]}
                  flexDirection="column"
                >
                  <Box>
                    緊急性：
                  </Box>
                  <Box>
                    關鍵內容：
                  </Box>
                </Box>
              </SectionBox>
          </ContentWrapper>
        </Box>
      </Wrapper>
    </>
  );
}

export default Detail;
