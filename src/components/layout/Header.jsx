import { Link, Outlet } from "react-router-dom";
import { UserMenu, Notify } from "./PopupMenu";
import { Navigate } from "react-router-dom";
import { Flex, HStack, Text } from "@chakra-ui/react";
import { useAuth } from "../Context/AuthContext";
import { useUserData } from "../Context/UserDataContext";

function Header() {
  const { userLoggedIn } = useAuth();
  const { isUserDataExist } = useUserData();
  var navigator;
  if(!userLoggedIn){
    navigator = <Navigate to={"/Login"} replace={true} />
  } else if(!isUserDataExist){
    navigator =<Navigate to={"/register/user-types"} replace={true} />
  }
  return (
    <>
      {navigator}
      <Flex bgGradient="linear-gradient(180deg, rgb(91, 110, 255) 0%, rgb(100, 118, 255) 100%)">
        <Flex mx="auto" maxW="1000px" w="100%" justify="space-between">
          <HStack
            justify="center"
            align="center"
            spacing="4"
            color="white"
            fontWeight="bold"
            fontSize="xl"
          >
            <Text as={Link} to="/home" fontSize="3xl">
              智慧郵箱
            </Text>
            <Text as={Link} to="/home/history">
              歷史紀錄
            </Text>
            <Text as={Link} to="/home/statistics">
              圖表統計
            </Text>
            <Text as={Link} to="/home/inside-box">
              郵箱內部
            </Text>
            <Text as={Link} to="/home/admin">
              管理介面
            </Text>
          </HStack>
          <HStack>
            <Notify />
            <UserMenu />
          </HStack>
        </Flex>
      </Flex>
      <Outlet />
    </>
  );
}

export default Header;
