import { useParams } from 'react-router-dom';
import { auth, db } from '../../firebase/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../../components/layout/Wrapper';
import Content from '../../components/layout/Content';
import Title from '../../components/ui/Title';
import Box from '../../components/ui/Box';
import { useAuthState } from 'react-firebase-hooks/auth';

Section.propTypes= {
  title: PropTypes.string,
  children: PropTypes.any
}

function Section({ title, children, ...props}){
  return (
    <Box
      mb={3}
      p={2}
      fontSize={[0, 1]}
      bg={"secondary-background"}
      borderRadius={4}
      flexDirection={"column"}
      { ...props }
    >
      <Title
        my={2}     
        fontSize={[1, 2]}
        textAlign={"center"}
      >
          {title}
      </Title>
      {children}
    </Box>
  )
}

function Detail() {
  const { id } = useParams();
  const [ user ] = useAuthState(auth);
  const [ userData, setUserData ] = useState(null);
  const [ maildata, setMaildata ] = useState({});

  useEffect(() => {
    const fetchUserData = async() => {
      if(userData !== null){
        try {
          //提取集合
          const userMailDoc = doc(collection(db, `mail/${userData.mailID}`), id);

          const result = await getDoc(userMailDoc);

          setMaildata(result.data());

        } catch (error) {
          //console.log(error);
        }
      }
    }
    fetchUserData();
  }, [id, userData])

  useEffect(() => {
    const fetchUserData = async() => {
      if(user !== null) {
        try {
          const userDoc = doc(db, `users/${user.uid}`);

          const result = await getDoc(userDoc);

          setUserData(result.data());

        } catch (error) {
          //console.log(error);
        }
      }
    }
    fetchUserData();
  }, [user, userData])

  return (
    <>
      <Wrapper title="郵件細節">
        <Box
          justifyContent={"center"}
        >
          <Content maxWidth="600px">
              <Section title="基本資訊">
                <span>送達日期：{maildata.date}</span>
                <span>信件主題：{maildata.title}</span>
                <span>類型：{maildata.type}</span>
                <span>收信人：{maildata.name}</span>
              </Section>
              <Section title="進階資訊">
                <span>寄送人：</span>
                <span>寄送單位：</span>
                <span>寄送單位地址：</span>
              </Section>
              <Section title="額外資訊">
                <span>緊急性：</span>
                <span>關鍵內容：</span>
              </Section>
          </Content>
        </Box>
      </Wrapper>
    </>
  );
}

export default Detail;