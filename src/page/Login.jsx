import '../css/Home.css'
import styled from 'styled-components'
import { useEffect } from 'react'
import { gapi } from 'gapi-script'
import LoginButton from '../components/login'

const Title = styled.h2`
    font-size: 2em;
    color: white;
    text-align: center;
  `

const Title2 = styled.h2`
    font-size: 1.2em;
    color: white;
  `

function Home() {

  useEffect(() => {
    function start() {
      gapi.auth2.init({
        clientId: import.meta.env.VITE_CLIENT_ID,
        scope: ""
      })
    }
    gapi.load('client:auth2', start)
  })


  return (
    <>
      <div className='container'>
        <img className='cover' src='../../images/postbox.png'></img>
        <div className="login-form">
            <Title>帳號登入</Title>
            <form action="#" method="post">
              <Title2>電子信箱或使用者名稱</Title2>
              <input type="text" name="username" placeholder="電子信箱或使用者名稱" required></input>
              <Title2>密碼</Title2>
              <input type="password" name="password" placeholder="密碼" required></input>
              <input type="submit" value="登入"></input>
            </form>
            <LoginButton />
        </div>
      </div>
    </>
  )
}

export default Home
