import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { Navigate, Link } from 'react-router-dom';
import { GoogleButton } from '../components/GoogleButton';
import { doSignInWithGoogle, doSignInWithEmailAndPassword } from '../firebase/auth';
import { HandleAccountContainer, HandleAccountCard, HandleAccountErrorMessage, StyledButton, CaptionTextBox } from '../components/CommonStyles';

function Login() {
  const [ user ] = useAuthState(auth);
  const [ isSigningIn, setIsSigningIn ] = useState(false);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errorMessage, SetErrorMessage ] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if(!isSigningIn) {
        setIsSigningIn(true);
        await doSignInWithEmailAndPassword(email, password).catch(() => {
          SetErrorMessage('帳號或密碼錯誤！');
          setIsSigningIn(false);
        });
        // doSendEmailVerification()
    }
  }

  const handleErrorMessage = () => {
    SetErrorMessage('');
  }

  const onGoogleSignIn = (e) => {
    e.preventDefault();

    if (!isSigningIn) {
        setIsSigningIn(true);
        doSignInWithGoogle().catch(error => {
            setIsSigningIn(false);
            console.log(error);
        })
    }
  }

  return (
    <>
      {user && (<Navigate to={'/home'} replace={true} />)}

      <HandleAccountContainer>
        <img src='../../images/postbox.png'></img>
        <HandleAccountCard>
            <h2>帳號登入</h2>
            <form onSubmit={onSubmit}>
              <div>
                <label>
                  電子信箱或使用者名稱
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="電子信箱或使用者名稱"
                  required
                  value={email}
                  onClick={ handleErrorMessage }
                  onChange={(e) => { setEmail(e.target.value)}}
                />
              </div>
              <div>
                <label>
                  密碼
                </label>
                <input 
                  type="password"
                  autoComplete="new-password"
                  placeholder="密碼" 
                  required
                  value={password}
                  onClick={ handleErrorMessage }
                  onChange={(e) => { setPassword(e.target.value) }}
                />
              </div>
              {errorMessage && (<HandleAccountErrorMessage>{errorMessage}</HandleAccountErrorMessage>)}
              <StyledButton
                type="submit"
                isDisabled={isSigningIn} 
                bg="primary" 
                width="50%" 
                borderRadius="5px"
                mx="auto"
                my="2em"
                p="0.8em"
              >
                登入
              </StyledButton>
            </form>
            <p>尚未註冊？<Link to={'/register'}>註冊</Link></p>
            <CaptionTextBox>
              <hr/>
              <p>或是使用其他方式</p>
              <hr/>
            </CaptionTextBox>
            <GoogleButton onClick={onGoogleSignIn} m="auto">
              Google 登入
            </GoogleButton>
        </HandleAccountCard>
      </HandleAccountContainer>
    </>
  );
}

export default Login;
