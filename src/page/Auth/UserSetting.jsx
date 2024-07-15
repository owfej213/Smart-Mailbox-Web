import Wrapper from "../../components/ui/Wrapper";
import Container from "../../components/ui/Container";
import {
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../../components/Context/AuthContext";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import SubTitle from "../../components/ui/SubTitle";
import Icon from "../../components/ui/Icon";
import { useUserData } from "../../components/Context/UserDataContext";

function Setting() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formUserName, setFormUserName] = useState("");
  const [formUserRealName, setFormUserRealName] = useState("");
  const [formMailBoxID, setFormMailBoxID] = useState("");
  const [isError, setIsError] = useState("");
  const { userData } = useUserData();
  const { userName, userRealName, mailBoxID } = userData || {};

  const toast = useToast();

  useEffect(() => {
    setFormUserName(userName);
    setFormUserRealName(userRealName);
    setFormMailBoxID(mailBoxID);
  }, [mailBoxID, userName, userRealName]);

  const onSubmit = async (e) => {
    e.preventDefault();
    async function UserDataUpdate() {
      try {
        if (currentUser) {
          setLoading(true);
          // 確認名稱是否重複
          if (userName !== formUserName) {
            const usersDoc = query(
              collection(db, "users"),
              where("userName", "==", formUserName)
            );
            const QuerySnapshot = await getDocs(usersDoc);
            if (!QuerySnapshot.empty) {
              setIsError("名稱重複!");
              setLoading(false);
              return;
            }
          }
          const userDocRef = doc(db, `users/${currentUser.uid}`);

          if (formUserName && formUserName !== userName)
            updateDoc(userDocRef, { userName: formUserName });
          if (formUserRealName && formUserRealName !== userRealName)
            updateDoc(userDocRef, { userRealName: formUserRealName });
          if (formMailBoxID && mailBoxID !== formMailBoxID) {
            updateDoc(userDocRef, { mailBoxID: formMailBoxID });

            const mailBoxRef = doc(db, `mailBoxes/${mailBoxID}`);
            const mailBoxNewRef = doc(db, `mailBoxes/${formMailBoxID}`);
            let userList = [];
            let newUserList = [];

            if (mailBoxID) {
              const result = await getDoc(mailBoxRef);
              userList = result.data()?.users || [];
              userList = userList.filter((user) => {
                return user.userID !== currentUser.uid;
              });
              setDoc(mailBoxRef, { users: userList });
            }
            if (formMailBoxID) {
              const result = await getDoc(mailBoxNewRef);
              newUserList = result.data()?.users || [];
              newUserList.push({
                userID: currentUser.uid,
                userName: formUserName,
              });
              setDoc(mailBoxNewRef, { users: newUserList });
            }
          }
          setLoading(false);
          toast({
            title: "儲存成功！",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }
    UserDataUpdate();
  };

  return (
    <>
      <Wrapper>
        <Flex w="150px" direction="column">
          <SubTitle textAlign="left" size="2xl">
            設定
          </SubTitle>
          <VStack align="flex-start">
            <Button
              color="white"
              bg="none"
              h="8"
              leftIcon={<Icon name="UserCog" color="white" />}
              _hover={{
                bg: "gray.500",
              }}
            >
              帳戶
            </Button>
            <Button
              color="white"
              bg="none"
              h="8"
              leftIcon={<Icon name="BellDot" color="white" />}
              _hover={{
                bg: "gray.500",
              }}
            >
              通知
            </Button>
          </VStack>
        </Flex>
        <Container w={["100%", "100%", "600px"]}>
          <Card variant="setting">
            <CardBody>
              <form onSubmit={onSubmit}>
                <VStack align="flex-start">
                  <FormControl isInvalid={isError}>
                    <FormLabel>使用者名稱</FormLabel>
                    <Input
                      maxLength={20}
                      value={formUserName}
                      onChange={(e) => {
                        setFormUserName(e.target.value);
                        setIsError("");
                      }}
                    />
                    {isError ? (
                      <FormErrorMessage color="red.500" fontWeight="bold">
                        {isError}
                      </FormErrorMessage>
                    ) : (
                      <FormHelperText color="gray.700">
                        帳戶登入與顯示
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel>真實姓名</FormLabel>
                    <Input
                      maxLength={20}
                      value={formUserRealName}
                      onChange={(e) => {
                        setFormUserRealName(e.target.value);
                      }}
                    />
                    <FormHelperText color="gray.700">
                      確保能夠寄送通知
                    </FormHelperText>
                  </FormControl>
                  <FormControl>
                    <FormLabel>郵箱ID</FormLabel>
                    <Input
                      value={formMailBoxID}
                      onChange={(e) => {
                        setFormMailBoxID(e.target.value);
                      }}
                    />
                  </FormControl>
                  <Button
                    isDisabled={loading}
                    isLoading={loading}
                    type="submit"
                    mt="4"
                    colorScheme="blue"
                  >
                    儲存全部
                  </Button>
                </VStack>
              </form>
            </CardBody>
          </Card>
        </Container>
      </Wrapper>
    </>
  );
}

export default Setting;
