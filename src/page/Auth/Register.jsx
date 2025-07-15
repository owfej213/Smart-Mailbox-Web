import {
  Box,
  Button,
  Card,
  Field,
  Flex,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useLayoutEffect, useState } from 'react';
import {
  userDataInitial,
  doCreateUserWithEmailAndPassword,
  doSignInWithGoogle,
} from '../../utils/firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import GoogleButton from '../../components/ui/GoogleButton';
import Logo from '../../components/layout/Logo';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Register() {
  const { userLoggedIn } = useAuthContext();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, SetErrorMessage] = useState('');

  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!isRegistering && userLoggedIn) navigate('/home');
  }, [isRegistering, navigate, userLoggedIn]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isRegistering) {
      //處理註冊事件
      setIsRegistering(true);

      //await fetchSignInMethodsForEmail(auth, email).then((res) => console.log(res))
      //TODO：檢查用戶是否使用其他方式登入，上面方法有email enumeration protection問題
      //https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection

      try {
        const userCredential = await doCreateUserWithEmailAndPassword(
          email,
          password
        );
        userDataInitial(userCredential);
      } catch (error) {
        if (error.code === 'auth/email-already-in-use')
          SetErrorMessage('帳號已使用！');
        if (error.code === 'auth/invalid-email')
          SetErrorMessage('無效的帳號！');
        if (error.code === 'auth/weak-password')
          SetErrorMessage('密碼需至少6個字元！');
      }
      setIsRegistering(false);
    }
  };

  const handleErrorMessage = () => {
    SetErrorMessage('');
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();

    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((error) => {
        setIsSigningIn(false);
        console.log(error);
      });
    }
  };

  return (
    <>
      <Heading size="5xl" textAlign="center" my="8">
        智慧郵箱網頁平台
      </Heading>
      <HStack justify="center">
        <Card.Root variant="dark.outline">
          <Card.Header>
            <Heading size="2xl" textAlign="center">
              建立新帳戶
            </Heading>
          </Card.Header>
          <Card.Body>
            <form onSubmit={onSubmit}>
              <VStack w="300px" pt="4" gap="4">
                <Field.Root>
                  <Field.Label fontSize="md">電子信箱</Field.Label>
                  <Input
                    type="text"
                    autoComplete="email"
                    required
                    onClick={handleErrorMessage}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Field.Root>
                <Field.Root invalid={errorMessage}>
                  <Field.Label fontSize="md">密碼</Field.Label>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    required
                    onClick={handleErrorMessage}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <Field.ErrorText>{errorMessage}</Field.ErrorText>
                </Field.Root>
                <Button
                  disabled={isSigningIn || isRegistering || !email || !password}
                  loading={isSigningIn || isRegistering}
                  type="submit"
                  my="4"
                  w="150px"
                  bg="blue.500"
                  _hover={{
                    bg: 'blue.600',
                  }}
                  fontWeight="bold"
                  fontSize="md"
                >
                  註冊
                </Button>
                <Flex>
                  <Text>已經有帳戶？</Text>
                  <Text
                    as={Link}
                    to={'/login'}
                    fontWeight="bold"
                    _hover={{
                      color: 'blue.500',
                    }}
                  >
                    登入
                  </Text>
                </Flex>
              </VStack>
            </form>
          </Card.Body>
          <Card.Footer justifyContent="center">
            <VStack w="100%">
              <Flex w="100%" alignItems="center">
                <Box borderBottom="1px solid" flex="1" />
                <Text mx="2">或是使用其他方式</Text>
                <Box borderBottom="1px solid" flex="1" />
              </Flex>
              <GoogleButton onClick={onGoogleSignIn} mt="4" />
            </VStack>
          </Card.Footer>
        </Card.Root>
      </HStack>
      <Flex mt="8" justify="center">
        <Logo />
      </Flex>
    </>
  );
}
