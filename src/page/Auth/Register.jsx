import { useLayoutEffect, useState } from "react";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithGoogle,
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

function Register() {
  const { userLoggedIn } = useAuth();

  const [isRegistering, setIsRegistering] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, SetErrorMessage] = useState("");

  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!isRegistering && userLoggedIn) navigate("/home");
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
        doCreateUserWithEmailAndPassword(email, password);

        setIsRegistering(false);
      } catch (error) {
        if (error.code === "auth/email-already-in-use")
          SetErrorMessage("帳號已使用！");
        if (error.code === "auth/invalid-email")
          SetErrorMessage("無效的帳號！");
        if (error.code === "auth/weak-password")
          SetErrorMessage("密碼需至少6個字元！");
      }
    }
  };

  const handleErrorMessage = () => {
    SetErrorMessage("");
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
            <Heading>建立新帳戶</Heading>
          </CardHeader>
          <CardBody>
            <form onSubmit={onSubmit}>
              <VStack px="4">
                <FormControl w="100%">
                  <FormLabel>電子信箱</FormLabel>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="電子信箱"
                    required
                    onClick={handleErrorMessage}
                    onChange={(e) => {
                      setEmail(e.target.value);
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
                  isDisabled={isRegistering || isSigningIn}
                  isLoading={isRegistering || isSigningIn}
                  colorScheme="green"
                  variant="solid"
                >
                  註冊
                </Button>
                <Flex>
                  <Text color="gray.200">已經有帳戶？</Text>
                  <Text
                    as={Link}
                    to={"/Login"}
                    fontWeight="bold"
                    _hover={{
                      color: "blue.400",
                    }}
                  >
                    登入
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

export default Register;
