import { Link, Outlet, useLocation } from "react-router-dom";
import { UserMenu, Notify } from "./PopupMenu";
import { Flex, Spacer, Stack, Text, useToast } from "@chakra-ui/react";
import { useUserData } from "../Context/UserDataContext";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function NavItem({ children, to, allowedRoles = ["user"] }) {
  const { userData } = useUserData();
  const { userRole } = userData || {};
  const location = useLocation();
  const isActive = to === location.pathname;

  return (
    (allowedRoles.includes(userRole) || userRole === "root") && (
      <Text
        as={Link}
        to={to}
        color="white"
        _hover={{
          color: "gray.100",
        }}
        _after={
          isActive
            ? {
                content: '""',
                display: "block",
                h: "4px",
                borderRadius: "5px",
                animation: "slide 0.5s",
                bg: "blue.200",
              }
            : {
                content: '""',
                display: "block",
                h: "4px",
              }
        }
      >
        {children}
      </Text>
    )
  );
}

NavItem.propTypes = {
  children: PropTypes.any,
  to: PropTypes.string,
  allowedRoles: PropTypes.array,
};

function Header() {
  const { isMailBoxIdDefault, isUserNameDefault, userData } = useUserData();
  const { userRole } = userData || {};
  const toast = useToast();
  const toastMailIDRef = useRef();
  const toastUserNameRef = useRef();

  useEffect(() => {
    if (
      (!toastMailIDRef.current || toastMailIDRef.current < 2) &
      (userRole === "user") &
      isMailBoxIdDefault
    ) {
      toastMailIDRef.current = toast({
        title: `目前郵箱ID為Example`,
        description: "請先在個人設定中更改郵箱ID！",
        duration: null,
        status: "warning",
        variant: "subtle",
        isClosable: true,
      });
    }
    if (
      (!toastUserNameRef.current || toastUserNameRef.current < 2) &
      (userRole === "user") &
      isUserNameDefault
    ) {
      toastUserNameRef.current = toast({
        title: `目前登入名稱為Example`,
        description: "請先在個人設定中更改名稱！",
        duration: null,
        status: "warning",
        variant: "subtle",
        isClosable: true,
      });
    }
  }, [isMailBoxIdDefault, isUserNameDefault, toast, userRole]);

  return (
    <>
      <Flex
        w="100%"
        bgGradient="linear-gradient(180deg, rgb(91, 110, 255) 0%, rgb(100, 118, 255) 100%)"
      >
        <Stack
          mx={["2", "2", "2", "auto"]}
          w="100%"
          maxW="1000px"
          spacing={["2", "2", "4"]}
          fontWeight="bold"
          fontSize="xl"
          align={["none", "none", "center"]}
          direction={["column", "column", "row"]}
        >
          <Text
            as={Link}
            to="/home"
            fontSize="3xl"
            color="white"
            align="center"
          >
            智慧郵箱
          </Text>
          <NavItem to="/home">主頁</NavItem>
          <NavItem to="/history">歷史紀錄</NavItem>
          <NavItem to="/statistics">圖表統計</NavItem>
          <NavItem to="/inside-box">郵箱內部</NavItem>
          <NavItem to="/admin" allowedRoles={["admin"]}>
            管理介面
          </NavItem>
          <NavItem to="/send-mail-test" allowedRoles={["root"]}>
            信件上傳測試
          </NavItem>
          <NavItem to="/send-image-test" allowedRoles={["root"]}>
            圖片上傳測試
          </NavItem>

          <Spacer />
          <Flex>
            <Notify />
            <UserMenu />
          </Flex>
        </Stack>
      </Flex>
      <Outlet />
    </>
  );
}

export default Header;
