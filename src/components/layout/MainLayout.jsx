import { UserDataProvider } from '../context/UserDataProvider';
import { MailsDataProvider } from '../context/MailsDataProvider';
import { VoiceProvider } from '../context/VoiceProvider';
import { Box } from '@chakra-ui/react';
import Container from '../ui/Container';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Toaster } from '../ui/toaster';
import { DefaultUserDataToaster } from './DefaultUserDataToaster';

export default function MainLayout() {
  return (
    <Box minH="100vh">
      <UserDataProvider>
        <MailsDataProvider>
          <VoiceProvider>
            <Header />
            <DefaultUserDataToaster />
            <Box py="8">
              <Container>
                <Toaster />
                <Outlet />
              </Container>
            </Box>
          </VoiceProvider>
        </MailsDataProvider>
      </UserDataProvider>
    </Box>
  );
}
