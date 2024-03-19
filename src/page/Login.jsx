import styled from 'styled-components';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import LoginButton from '../components/Login';
import Container from '../components/Container';

const ContainerLogin = styled(Container)`
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Cover = styled.img`
  width: 256px;
  height: 256px;
`

const LoginCard = styled.div`
  margin-left: 10em;
  width: 20em;
  padding: 2em;
  border: 2px solid #ccc;
  border-radius: 5px;

  input[type="text"],
  input[type="password"],
  input[type="submit"] {
    width: 100%;
    margin-bottom: 0.5em;
    padding: 0.8em;
    box-sizing: border-box;
    border: 0;
    border-radius: 5px;
  }

  input[type="submit"] {
    width: 70%;
    margin: 0 15%;
    margin-top: 1em;
    background-color: rgb(56, 182, 255);
    color: black;
    font-weight: bolder;
    cursor: pointer;
  }
`

const LoginTitle = styled.h2`
    font-size: 2em;
    color: white;
    text-align: center;
  `

const LoginSubtitle = styled.h2`
    font-size: 1.2em;
    color: white;
  `

function Home() {

  useEffect(() => {
    //初始化 GoogleAuth 物件
    gapi.load('auth2', () => {
      gapi.auth2.init({
        clientId: import.meta.env.VITE_CLIENT_ID,
        scope: ""
      });
    });
  }, []);

  return (
    <>
      <ContainerLogin>
        <Cover src='../../images/postbox.png'></Cover>
        <LoginCard>
            <LoginTitle>帳號登入</LoginTitle>
            <form action="#" method="post">
              <LoginSubtitle>電子信箱或使用者名稱</LoginSubtitle>
              <input type="text" name="username" placeholder="電子信箱或使用者名稱" required></input>
              <LoginSubtitle>密碼</LoginSubtitle>
              <input type="password" name="password" placeholder="密碼" required></input>
              <input type="submit" value="登入"></input>
            </form>
            <LoginButton />
        </LoginCard>
      </ContainerLogin>
    </>
  );
}

export default Home;
