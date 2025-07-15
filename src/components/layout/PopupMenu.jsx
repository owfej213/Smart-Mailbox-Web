import { Box, Button, Menu, Portal } from '@chakra-ui/react';
import { doSignOut } from '../../utils/firebase/auth';
import { useNavigate } from 'react-router-dom';
import Icon from '../ui/Icon';

export function UserMenu() {
  const navigate = useNavigate();

  function SignOut() {
    doSignOut().then(() => navigate('/Login'));
  }
  function Setting() {
    navigate('/setting');
  }
  return (
    <>
      <Box p="2">
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button
              p="1"
              bg="brand.900"
              borderWidth="2"
              borderColor="brand.500"
              _hover={{ bg: 'brand.700' }}
              _expanded={{ bg: 'brand.700' }}
            >
              <Icon name="CircleUserRound" color="white" size={24} />
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item
                  onClick={Setting}
                  cursor="pointer"
                  _hover={{
                    bg: 'brand.100',
                  }}
                >
                  <Icon name="Settings" color="black" size={16} />
                  個人設定
                </Menu.Item>
                <Menu.Item
                  onClick={SignOut}
                  cursor="pointer"
                  _hover={{
                    bg: 'brand.100',
                  }}
                >
                  <Icon name="LogOut" color="black" size={16} />
                  登出
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Box>
    </>
  );
}

export function Notify() {
  return (
    <>
      <Box p="2">
        <Menu.Root placement="bottom">
          <Menu.Trigger asChild>
            <Button
              p="1"
              bg="brand.900"
              borderWidth="2"
              borderColor="brand.500"
              _hover={{ bg: 'brand.700' }}
              _expanded={{ bg: 'brand.700' }}
            >
              <Icon name="Bell" color="white" size={24} />
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item
                  cursor="pointer"
                  _hover={{
                    bg: 'brand.100',
                  }}
                >
                  目前沒有任何通知
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Box>
    </>
  );
}
