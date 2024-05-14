import { motion } from "framer-motion";
import Icon from "../../components/ui/Icon";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import MainTitle from "../../components/ui/MainTitle";
import AuthWrapper from "../../components/ui/AuthWrapper";
import { Button, Center, Flex } from "@chakra-ui/react";
import { useUserData } from "../../components/Context/UserDataContext";
import { useLayoutEffect } from "react";

function Card({ userType, iconName, bg }) {
  function handleClick() {
    sessionStorage.setItem("userType", userType);
  }

  return (
    <Link to={"/register/user-options"}>
      <motion.div
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 10, opacity: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={handleClick}
          w="210px"
          h="240px"
          p="0"
          bg="transparent"
          flexDirection="column"
          _hover={{
            bg: "transparent",
          }}
        >
          <Center
            bg={bg}
            width="100%"
            height="100%"
            borderTopLeftRadius="10"
            borderTopRightRadius="10"
          >
            <Icon name={iconName} color="white" size={100} />
          </Center>
          <Center
            height="60px"
            w="100%"
            bg="white"
            borderBottomLeftRadius="10"
            borderBottomRightRadius="10"
            fontSize="xl"
            fontWeight="bold"
          >
            {userType}
          </Center>
        </Button>
      </motion.div>
    </Link>
  );
}

Card.propTypes = {
  userType: PropTypes.string,
  iconName: PropTypes.string,
  bg: PropTypes.string,
};

function UserTypes() {
  const { isUserDataExist } = useUserData();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if(isUserDataExist) navigate("/home");
  }, [isUserDataExist, navigate]);

  return (
    <>
      <MainTitle>請選擇帳號類型</MainTitle>
      <AuthWrapper>
        <Center minHeight="calc(100vh - 250px)">
          <Flex justify="space-between" w="500px">
            <Card userType="住戶" iconName="UserRound" bg="blue.500" />
            <Card userType="管理員" iconName="FolderKanban" bg="red.500" />
          </Flex>
        </Center>
      </AuthWrapper>
    </>
  );
}

export default UserTypes;
