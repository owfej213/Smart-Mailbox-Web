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
import {
  doSignInWithGoogle,
  doSignInWithEmailAndPassword,
  doSignInWithUserName,
} from '../../utils/firebase/auth';
import { useLayoutEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleButton from '../../components/ui/googleButton';
import Logo from '../../components/layout/Logo';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Login() {
  const { userLoggedIn } = useAuthContext();

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [input, setInput] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (userLoggedIn) navigate('/home');
  }, [navigate, userLoggedIn]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsSigningIn(true);
    try {
      if (input === 'Example') {
        setErrorMessage('Example為預設名稱，若尚未修改名稱，請使用Email登入！');
        setIsSigningIn(false);
        return;
      }

      if (isEmail(input)) {
        // 使用電子郵件登入
        await doSignInWithEmailAndPassword(input, password);
      } else {
        // 使用用戶名登入
        await doSignInWithUserName(input, password);
      }
    } catch (error) {
      setErrorMessage('帳號或密碼錯誤！');
      //console.log(error);
    }

    setIsSigningIn(false);
  };

  const isEmail = (input) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(input);
  };

  const handleErrorMessage = () => {
    setErrorMessage('');
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();

    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch(() => {
        setIsSigningIn(false);
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
              帳號登入
            </Heading>
          </Card.Header>
          <Card.Body>
            <form onSubmit={onSubmit}>
              <VStack w="300px" pt="4" gap="4">
                <Field.Root>
                  <Field.Label fontSize="md">電子信箱或使用者名稱</Field.Label>
                  <Input
                    type="text"
                    autoComplete="email"
                    required
                    onClick={handleErrorMessage}
                    onChange={(e) => {
                      setInput(e.target.value);
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
                  disabled={isSigningIn}
                  loading={isSigningIn}
                  type="submit"
                  my="4"
                  w="150px"
                  bg="brand.400"
                  _hover={{
                    bg: 'brand.500',
                  }}
                  fontWeight="bold"
                  fontSize="md"
                >
                  登入
                </Button>
                <Flex>
                  <Text>尚未註冊？</Text>
                  <Text
                    as={Link}
                    to={'/register'}
                    fontWeight="bold"
                    _hover={{
                      color: 'blue.500',
                    }}
                  >
                    註冊
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
