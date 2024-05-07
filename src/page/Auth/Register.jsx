import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { GoogleButton } from '../../components/ui/GoogleButton';
import { HandleAccountContainer, HandleAccountCard, HandleAccountErrorMessage, CaptionTextBox } from '../../components/CommonStyles';
import { auth } from '../../firebase/firebase';
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from '../../firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Title from '../../components/ui/Title';
import Logo from '../../components/layout/Logo';
import Button from '../../components/ui/Button';

function Register(){
  const [ user ] = useAuthState(auth);
  const [ isRegistering, setIsRegistering ] = useState(false);
  const [ isSigningIn , setIsSigningIn ] = useState(false);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errorMessage, SetErrorMessage ] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    SetErrorMessage('');

    if(!isRegistering) {//處理註冊事件
      setIsRegistering(true);

      //await fetchSignInMethodsForEmail(auth, email).then((res) => console.log(res))
      //TODO：檢查用戶是否使用其他方式登入，上面方法有email enumeration protection問題
      //https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection

      try {

        await doCreateUserWithEmailAndPassword(email, password);
        
      } catch(error) {
        if(error.code === "auth/email-already-in-use") SetErrorMessage('帳號已使用！');
        if(error.code === "auth/invalid-email" ) SetErrorMessage('無效的帳號！');
        if(error.code === "auth/weak-password" ) SetErrorMessage('密碼需至少6個字元！');
      }
      return;
    }
  }

  const handleErrorMessage = () => {
    SetErrorMessage('');
  }

  const onGoogleSignIn = (e) => {
    e.preventDefault();

    if (!isSigningIn) {
        setIsSigningIn(true);
        doSignInWithGoogle().catch(err => {
            setIsSigningIn(false);
            console.log(err);
        })
    }
  }

  return (
    <>
      {user && (<Navigate to={'/home'} replace={true} />)}
      <Title
        my={4}
        fontSize={[4, 5, 6]}
        color={"White"}
        textAlign={"center"}
      >
        智慧郵箱網頁平台
      </Title>
      <HandleAccountContainer>
        <Logo />
        <HandleAccountCard>
            <h2>建立新帳戶</h2>
            <form onSubmit={onSubmit}>
              <div>
                <label>
                  電子信箱
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="電子信箱"
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
              <Button 
                type="submit"
                isDisabled={isRegistering} 
                bg="success" 
                width="50%" 
                borderRadius="5px"
                mx="auto"
                my="2em"
                p="0.8em"
                variant="primary"
              >
                註冊
              </Button>
            </form>
            <p>已經有帳戶？<Link to={'/login'}>登入</Link></p>
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
  )
}

export default Register;