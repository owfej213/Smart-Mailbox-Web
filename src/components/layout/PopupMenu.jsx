import { doSignOut } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import Icon from "../ui/Icon";
import {
  Box,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

export function UserMenu() {
  const navigate = useNavigate();

  function SignOut() {
    doSignOut().then(() => navigate("/Login"));
  }
  function Setting() {
    navigate("/setting");
  }
  return (
    <>
      <Box p="2">
        <Menu direction="rtl" placement="bottom">
          <MenuButton
            as={Button}
            p="2"
            w="100%"
            h="100%"
            bg="transparent"
            borderRadius="8"
            _hover={{ bg: "gray.400" }}
            _expanded={{ bg: "blue.400" }}
          >
            <Icon name="CircleUserRound" color="white" size={42} />
          </MenuButton>
          <MenuList fontSize="md">
            <MenuItem
              icon={<Icon name="Settings" color="black" />}
              onClick={Setting}
              lineHeight="middle"
            >
              個人設定
            </MenuItem>
            <MenuItem
              icon={<Icon name="LogOut" color="black" />}
              onClick={SignOut}
            >
              登出
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </>
  );
}

export function Notify() {
  return (
    <>
      <Box p="2">
        <Menu direction="rtl" placement="bottom">
          <MenuButton
            as={Button}
            p="2"
            w="100%"
            h="100%"
            bg="transparent"
            borderRadius="8"
            _hover={{ bg: "gray.400" }}
            _expanded={{ bg: "blue.400" }}
          >
            <Icon name="Bell" color="white" size={42} />
          </MenuButton>
          <MenuList fontSize="md">
            <MenuItem as={Center}>目前沒有任何通知</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </>
  );
}
