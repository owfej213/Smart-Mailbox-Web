import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Icon from "../ui/Icon";
import SubTitle from "../ui/SubTitle";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import PropTypes from "prop-types";

function AddUserButton({ user, userList }) {
  const toast = useToast();
  const handleAddUser = (e) => {
    e.preventDefault();

    const isUserExisted = userList.some((item) => {
      return item.userName === user.userName && item.userID === user.userID;
    });
    if (isUserExisted)
      return toast({
        title: "用戶已存在！",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    return toast({
      title: "成功寄出邀請！",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };
  return (
    <Button
      leftIcon={<Icon name="CircleUserRound" color="gray" size={36} />}
      w="80%"
      h="50px"
      borderRadius="8"
      onClick={handleAddUser}
    >
      <Text w="100%" textAlign="center">
        {user.userName}
      </Text>
    </Button>
  );
}

AddUserButton.propTypes = {
  mailBoxID: PropTypes.string,
  user: PropTypes.object,
  userList: PropTypes.array,
};

const MailBoxUserModal = ({ mailBoxID }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchUserList, setSearchUserList] = useState([]);
  const [userList, setUserList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchMailBoxData = async () => {
      try {
        const mailBoxRef = doc(db, `mailBoxes/${mailBoxID}`);
        const result = await getDoc(mailBoxRef);
        setUserList(result.data()?.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMailBoxData();
  }, [mailBoxID]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    setSearchUserList([]);
    if (!searchKeyword) return;

    const usersRef = query(
      collection(db, "users"),
      where("userName", ">=", searchKeyword)
    );
    const querySnapshot = await getDocs(usersRef);
    // 遍歷查詢結果
    querySnapshot.forEach((doc) => {
      const result = doc.data();
      if (result.userName === "Example") return;
      if (result.userRole !== "user") return;
      setSearchUserList((prev) => [
        ...prev,
        {
          userID: doc.id,
          userName: result?.userName,
        },
      ]);
    });
  };

  return (
    <>
      <SubTitle size="2xl">郵箱使用人</SubTitle>
      <HStack mx="8" spacing="6">
        {userList &&
          userList.map((user) => {
            return (
              <VStack key={user?.userName}>
                <Icon name="CircleUserRound" color="white" size={42} />
                <Text fontWeight="600">{user?.userName}</Text>
              </VStack>
            );
          })}
        <VStack>
          <Button
            bg="gray.300"
            borderRadius="full"
            p="0"
            onClick={() => {
              onOpen();
              setSearchUserList([]);
            }}
          >
            <Icon name="Plus" color="white" size={30} />
          </Button>
        </VStack>
      </HStack>
      <Modal onClose={onClose} size="lg" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>新增用戶</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon name="Search" color="gray" size={20} />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="使用者名稱"
                  onChange={(e) => {
                    setSearchKeyword(e.target.value);
                  }}
                />
              </InputGroup>
              <Button onClick={handleSearchSubmit}>搜尋</Button>
            </HStack>
            <VStack pt="4">
              {searchUserList &&
                searchUserList.map((user, index) => {
                  return (
                    <AddUserButton
                      key={index}
                      user={user}
                      userList={userList}
                    />
                  );
                })}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

MailBoxUserModal.propTypes = {
  mailBoxID: PropTypes.string,
};

export default MailBoxUserModal;
