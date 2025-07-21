import {
  Box,
  Button,
  Card,
  Field,
  Grid,
  GridItem,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../utils/firebase/firebase';
import Icon from '../../components/ui/Icon';
import { toaster } from '../../components/ui/toaster';
import { useUserDataContext } from '../../hooks/context/useUserDataContext';
import { useAuthContext } from '../../hooks/context/useAuthContext';

function Setting() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [formUserName, setFormUserName] = useState('');
  const [formUserRealName, setFormUserRealName] = useState('');
  const [formMailBoxID, setFormMailBoxID] = useState('');
  const [isError, setIsError] = useState('');
  const { userData } = useUserDataContext();
  const { userName, userRealName, mailBoxID } = userData || {};

  useEffect(() => {
    setFormUserName(userName);
    setFormUserRealName(userRealName);
    setFormMailBoxID(mailBoxID);
  }, [mailBoxID, userName, userRealName]);

  const onSubmit = async (e) => {
    e.preventDefault();
    async function UserDataUpdate() {
      try {
        if (user) {
          setLoading(true);
          // 確認名稱是否重複
          if (userName !== formUserName) {
            const usersDoc = query(
              collection(db, 'users'),
              where('userName', '==', formUserName)
            );
            const QuerySnapshot = await getDocs(usersDoc);
            if (!QuerySnapshot.empty) {
              setIsError('名稱重複!');
              setLoading(false);
              return;
            }
          }
          const userDocRef = doc(db, `users/${user?.uid}`);

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
                return user.userID !== user?.uid;
              });
              setDoc(mailBoxRef, { users: userList });
            }
            if (formMailBoxID) {
              const result = await getDoc(mailBoxNewRef);
              newUserList = result.data()?.users || [];
              newUserList.push({
                userID: user?.uid,
                userName: formUserName,
              });
              setDoc(mailBoxNewRef, { users: newUserList });
            }
          }
          setLoading(false);
          toaster.create({
            description: '儲存成功！',
            type: 'success',
            closable: true,
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
      <Box animation="fade-in 0.5s">
        <Grid templateColumns="repeat(5, 1fr)" gap="4">
          <GridItem colSpan={1}>
            <Card.Root>
              <Card.Header>
                <Heading size="2xl">類別</Heading>
              </Card.Header>
              <Card.Body>
                <VStack align="flex-start">
                  <Button
                    bg="brand.700"
                    _hover={{
                      bg: 'brand.500',
                    }}
                  >
                    <Icon name="UserCog" color="white" />
                    帳戶
                  </Button>
                  <Button
                    bg="brand.700"
                    _hover={{
                      bg: 'brand.500',
                    }}
                  >
                    <Icon name="BellDot" color="white" />
                    通知
                  </Button>
                </VStack>
              </Card.Body>
            </Card.Root>
          </GridItem>
          <GridItem colSpan={4}>
            <Card.Root>
              <Card.Header>
                <Heading size="2xl">個人資料</Heading>
              </Card.Header>
              <Card.Body>
                <form onSubmit={onSubmit}>
                  <VStack align="flex-start">
                    <Field.Root invalid={isError}>
                      <Field.Label>使用者名稱</Field.Label>
                      <Input
                        maxLength={20}
                        value={formUserName}
                        onChange={(e) => {
                          setFormUserName(e.target.value);
                          setIsError('');
                        }}
                      />
                      <Field.ErrorText>{isError}</Field.ErrorText>
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>真實姓名</Field.Label>
                      <Input
                        maxLength={20}
                        value={formUserRealName}
                        onChange={(e) => {
                          setFormUserRealName(e.target.value);
                        }}
                      />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>郵箱ID</Field.Label>
                      <Input
                        value={formMailBoxID}
                        onChange={(e) => {
                          setFormMailBoxID(e.target.value);
                        }}
                      />
                    </Field.Root>
                    <Button
                      isDisabled={loading}
                      isLoading={loading}
                      type="submit"
                      mt="4"
                      bg="brand.400"
                      _hover={{
                        bg: 'brand.500',
                      }}
                      fontWeight="bold"
                    >
                      儲存全部
                    </Button>
                  </VStack>
                </form>
              </Card.Body>
            </Card.Root>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}

export default Setting;
