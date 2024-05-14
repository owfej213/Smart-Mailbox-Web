import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserMenu, Notify } from "./PopupMenu";
import { Flex, HStack, Text, useToast } from "@chakra-ui/react";
import { useAuth } from "../Context/AuthContext";
import { useUserData } from "../Context/UserDataContext";
import { useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";

function NavItem({ children, to }) {
  const location = useLocation();
  return (
    <>
      {to === location.pathname ? (
        <>
          <Text
            as={Link}
            to={to}
            _after={{
              content: '""',
              display: "block",
              h: "4px",
              borderRadius: "5px",
              animation: "slide 0.5s",
              bg: "blue.200",
            }}
          >
            {children}
          </Text>
        </>
      ) : (
        <>
          <Text
            as={Link}
            to={to}
            _after={{
              content: '""',
              display: "block",
              h: "4px",
            }}
          >
            {children}
          </Text>
        </>
      )}
    </>
  );
}

NavItem.propTypes = {
  children: PropTypes.any,
  to: PropTypes.string,
};

function Header() {
  const { userLoggedIn } = useAuth();
  const { isUserDataExist } = useUserData();
  const toast = useToast();
  const toastIdRef = useRef();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!userLoggedIn) {
      navigate("/Login");
    } else if (!isUserDataExist) {
      if (!toastIdRef.current) {
        toastIdRef.current = toast({
          title: `請先輸入個人基本資料！`,
          description: "你可以在個人設定中輸入",
          duration: null,
          status: "warning",
          variant: "subtle",
          isClosable: true,
        });
      }
    }
  }, [isUserDataExist, navigate, toast, userLoggedIn]);

  return (
    <>
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
            <NavItem to="/home">主頁</NavItem>
            <NavItem to="/home/history">歷史紀錄</NavItem>
            <NavItem to="/home/statistics">圖表統計</NavItem>
            <NavItem to="/home/inside-box">郵箱內部</NavItem>
            <NavItem to="/home/admin">管理介面</NavItem>
            <NavItem to="/home/test">信件上傳測試</NavItem>
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
