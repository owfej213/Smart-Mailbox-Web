import { Box } from '@chakra-ui/react';
import Container from '../ui/Container';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Toaster } from '../ui/toaster';

export default function MainLayout() {
  return (
    <Box minH="100vh">
      <Header />
      <Box pt="8">
        <Container>
          <Toaster />
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
