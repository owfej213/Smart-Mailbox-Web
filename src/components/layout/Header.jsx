import { Link, useLocation } from 'react-router-dom';
import { UserMenu, Notify } from './PopupMenu';
import { Box, Flex, Text, Toaster } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { History, Home, PieChart, View } from 'lucide-react';
import { useUserDataContext } from '../../hooks/useUserDataContext';

export default function Header() {
  const { isMailBoxIdDefault, isUserNameDefault, userData } =
    useUserDataContext();
  const { userRole } = userData || {};
  const toastMailIDRef = useRef();
  const toastUserNameRef = useRef();
  const location = useLocation();
  const navigation = [
    { name: '主頁', href: '/home', icon: Home },
    { name: '歷史紀錄', href: '/history', icon: History },
    { name: '圖表統計', href: '/statistics', icon: PieChart },
    { name: '郵箱內部', href: '/inside_box', icon: View },
  ];

  useEffect(() => {
    if (
      (!toastMailIDRef.current || toastMailIDRef.current < 2) &
      (userRole === 'user') &
      isMailBoxIdDefault
    ) {
      toastMailIDRef.current = Toaster({
        title: `目前郵箱ID為Example`,
        description: '請先在個人設定中更改郵箱ID！',
        duration: null,
        status: 'warning',
        variant: 'subtle',
        isClosable: true,
      });
    }
    if (
      (!toastUserNameRef.current || toastUserNameRef.current < 2) &
      (userRole === 'user') &
      isUserNameDefault
    ) {
      toastUserNameRef.current = Toaster({
        title: `目前登入名稱為Example`,
        description: '請先在個人設定中更改名稱！',
        duration: null,
        status: 'warning',
        variant: 'subtle',
        isClosable: true,
      });
    }
  }, [isMailBoxIdDefault, isUserNameDefault, userRole]);

  return (
    <>
      <Box
        w="100%"
        bg="background"
        borderBottom="1px solid"
        borderBottomColor="brand.500"
      >
        <Flex
          mx="auto"
          px={['4', '6', '8']}
          w="100%"
          maxW="container"
          h="16"
          justify="space-between"
          direction={['column', 'column', 'row']}
        >
          <Flex gap="4">
            <Flex align="center">
              <Text as={Link} to="/home" fontSize="2xl" fontWeight="bold">
                智慧郵箱
              </Text>
            </Flex>
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Flex
                  as={Link}
                  key={item.name}
                  to={item.href}
                  align="center"
                  borderBottom="2px solid"
                  color={isActive ? 'brand.50' : 'brand.200'}
                  borderColor={isActive ? 'brand.50' : 'transparent'}
                  _hover={{
                    color: 'brand.50',
                    borderColor: 'brand.50',
                  }}
                >
                  <Icon size={20} />
                  <Text pl="1">{item.name}</Text>
                </Flex>
              );
            })}
          </Flex>
          <Flex>
            <Notify />
            <UserMenu />
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
