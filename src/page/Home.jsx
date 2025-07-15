import {
  Box,
  Card,
  Grid,
  GridItem,
  HStack,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TimeBetween } from '../utils/dateUtils';
import PropTypes from 'prop-types';
import { useMailsDataContext } from '../hooks/useMailsDataContext';
import { monthsMailFilter } from '../utils/mailsFilters';
import { useUserDataContext } from '../hooks/useUserDataContext';
import { useAuthContext } from '../hooks/useAuthContext';

const List = ({ mailsData }) => {
  return (
    <>
      {mailsData &&
        mailsData.map((mail, index) => {
          if (mail.urgency !== '高') return;
          return (
            <Box key={index}>
              <Link to={`/detail/${mail.uid}`}>
                <HStack
                  color="brand.50"
                  _hover={{
                    color: 'brand.300',
                  }}
                >
                  <Text fontWeight="bold" fontSize="large">
                    {mail.title}
                  </Text>
                  <Text fontWeight="bold" fontSize="small">
                    - {TimeBetween(mail.createAt, new Date().getTime() / 1000)}
                  </Text>
                </HStack>
              </Link>
            </Box>
          );
        })}
    </>
  );
};

List.propTypes = {
  mailsData: PropTypes.array,
};

export default function Home() {
  const { isGoogleUser, isEmailUser } = useAuthContext();
  const { userData } = useUserDataContext();
  const { mailsData } = useMailsDataContext();
  const { userName, userRole } = userData || {};
  const [userLoginType, setUserLoginType] = useState('');

  const { thisMonthsMails } = monthsMailFilter(mailsData);

  useEffect(() => {
    if (isEmailUser) setUserLoginType('Email');
    if (isGoogleUser) setUserLoginType('Google');
  }, [isEmailUser, isGoogleUser]);

  return (
    <>
      <Box animation="fade-in 0.5s">
        <Grid templateColumns="repeat(4, 1fr)" gap="4">
          <GridItem colSpan="2">
            <Card.Root bg="brand.700" borderWidth="0">
              <Card.Header>
                <Heading size="2xl">個人資料</Heading>
              </Card.Header>
              <Card.Body>
                <VStack align="flex-start" color="text">
                  <Text>名稱：{userName}</Text>
                  <Text>身分：{userRole}</Text>
                  <Text>登入狀態：{userLoginType}</Text>
                </VStack>
              </Card.Body>
            </Card.Root>
          </GridItem>
          <GridItem colSpan="2">
            <Card.Root bg="brand.700" borderWidth="0" h="100%">
              <Card.Header>
                <Heading size="2xl">郵箱使用人</Heading>
              </Card.Header>
            </Card.Root>
          </GridItem>
        </Grid>
        <Card.Root bg="brand.700" borderWidth="0" p="4" mt="4">
          <Card.Header p="0" pb="4">
            <Heading size="2xl" textAlign="center">
              重要郵件(顯示30天內緊急度為高的郵件)
            </Heading>
          </Card.Header>
          <VStack>
            <List mailsData={thisMonthsMails} />
          </VStack>
        </Card.Root>
      </Box>
    </>
  );
}
