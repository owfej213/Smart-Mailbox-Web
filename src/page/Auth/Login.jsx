import { useLayoutEffect, useState } from "react";
import {
  doSignInWithGoogle,
  doSignInWithEmailAndPassword,
  doSignInWithUserName,
} from "../../firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "../../components/ui/GoogleButton";
import MainTitle from "../../components/ui/MainTitle";
import Logo from "../../components/layout/Logo";
import AuthWrapper from "../../components/ui/AuthWrapper";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useAuth } from "../../components/Context/AuthContext";

function Login() {
  const { userLoggedIn } = useAuth();

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useLayoutEffect(() => {
    if(userLoggedIn) navigate("/home");
  }, [navigate, userLoggedIn]);

  const onSubmit = async (e) => {
    e.preventDefault();

      setIsSigningIn(true);
      try {
        if (isEmail(input)) {
                // 使用電子郵件登入
                await doSignInWithEmailAndPassword(input, password)
            
              } else {
                // 使用用戶名登入
                await doSignInWithUserName(input, password);
             
            }
      } catch(error) {
        setErrorMessage("帳號或密碼錯誤！");
        //console.log(error);
      }
    
      setIsSigningIn(false);
  };

  const isEmail = (input) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(input);
  };

  const handleErrorMessage = () => {
    setErrorMessage("");
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
      <MainTitle>智慧郵箱網頁平台</MainTitle>
      <AuthWrapper>
        <Card variant="auth">
          <CardHeader>
            <Heading>帳號登入</Heading>
          </CardHeader>
          <CardBody>
            <form onSubmit={onSubmit}>
              <VStack px="4">
                <FormControl w="100%">
                  <FormLabel>電子信箱或使用者名稱</FormLabel>
                  <Input
                    type="text"
                    autoComplete="email"
                    placeholder="電子信箱或使用者名稱"
                    required
                    onClick={handleErrorMessage}
                    onChange={(e) => {
                      setInput(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl w="100%">
                  <FormLabel>密碼</FormLabel>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    placeholder="密碼"
                    required
                    onClick={handleErrorMessage}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </FormControl>
                {errorMessage && (
                  <Text color="red.400" fontWeight="bold">
                    {errorMessage}
                  </Text>
                )}
                <Button
                  type="submit"
                  my="8"
                  py="4"
                  w="150px"
                  isDisabled={isSigningIn}
                  isLoading={isSigningIn}
                  colorScheme="blue"
                  variant="solid"
                >
                  登入
                </Button>
                <Flex>
                  <Text color="gray.200">尚未註冊？</Text>
                  <Text
                    as={Link}
                    to={"/register"}
                    fontWeight="bold"
                    _hover={{
                      color: "blue.400",
                    }}
                  >
                    註冊
                  </Text>
                </Flex>
              </VStack>
            </form>
          </CardBody>
          <CardFooter>
            <Flex direction="column" w="100%">
              <HStack w="100%">
                <hr />
                <Text>或是使用其他方式</Text>
                <hr />
              </HStack>
              <GoogleButton onClick={onGoogleSignIn} m="auto" mt="8">
                Google 登入
              </GoogleButton>
            </Flex>
          </CardFooter>
        </Card>
      </AuthWrapper>
      <Flex mt="8" justify="center">
        <Logo />
      </Flex>
    </>
  );
}

export default Login;
