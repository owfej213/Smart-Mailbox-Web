import { Link, useLocation } from 'react-router-dom';
import { UserMenu, Notify } from './PopupMenu';
import { Box, Flex, Text } from '@chakra-ui/react';
import { History, Home, PackageOpen, PieChart, View } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const navigation = [
    { name: '主頁', href: '/home', icon: Home },
    { name: '郵件分析', href: '/analyze', icon: View },
    { name: '歷史紀錄', href: '/history', icon: History },
    { name: '圖表統計', href: '/statistics', icon: PieChart },
    { name: '郵箱內部', href: '/inside_box', icon: PackageOpen },
  ];

  return (
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
                <Text pl="2">{item.name}</Text>
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
  );
}
