import { db } from "../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import MainTitle from "../../components/ui/MainTitle";
import AuthWrapper from "../../components/ui/AuthWrapper";
import {
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useAuth } from "../../components/Context/AuthContext";
import { useUserData } from "../../components/Context/UserDataContext";

function UserOptions() {
  const { currentUser } = useAuth();
  const { isUserDataExist } = useUserData();
  const [loading, setLoading] = useState(false);
  const [userNickName, setUserNickName] = useState("");
  const [userRealName, setUserRealName] = useState("");
  const [address, setAddress] = useState("");
  const [mailBoxID, setMailID] = useState("");
  
  const onSubmit = async (e) => {
    e.preventDefault();

    async function UserDataUpdate() {
      try {
        if (currentUser) {
          setLoading(true);

          const userType = sessionStorage.getItem("userType");
          const userDocRef = doc(db, `users/${currentUser.uid}`);

          await setDoc(userDocRef, {
            userNickName: userNickName,
            userRealName: userRealName,
            userType: userType,
            email: currentUser.email,
            address: address,
            mailBoxID: mailBoxID,
          });
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    UserDataUpdate();
  };

  return (
    <>
      {isUserDataExist && <Navigate to={"/home"} replace={true} />}
      <MainTitle>請輸入基本資料</MainTitle>
      <AuthWrapper>
        <Center minHeight="calc(100vh - 250px)">
          <Card variant="auth">
            <CardBody>
              <form onSubmit={onSubmit}>
                <VStack px="8">
                  <FormControl>
                    <FormLabel>暱稱</FormLabel>
                    <Input
                      maxLength={20}
                      onChange={(e) => {
                        setUserNickName(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>真實姓名</FormLabel>
                    <Input
                      maxLength={20}
                      onChange={(e) => {
                        setUserRealName(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>地址</FormLabel>
                    <Input
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>郵箱ID</FormLabel>
                    <Input
                      onChange={(e) => {
                        setMailID(e.target.value);
                      }}
                    />
                  </FormControl>
                  <Button
                    isDisabled={loading}
                    isLoading={loading}
                    type="submit"
                    mt="4"
                    colorScheme="green"
                  >
                    繼續
                  </Button>
                </VStack>
              </form>
            </CardBody>
          </Card>
        </Center>
      </AuthWrapper>
    </>
  );
}

export default UserOptions;
