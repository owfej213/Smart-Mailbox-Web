import {
  Box,
  Card,
  DataList,
  Grid,
  GridItem,
  HStack,
  Heading,
  Table,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Mails, User, Users } from 'lucide-react';
import { TimeBetween } from '../utils/dateUtils';
import { monthsMailFilter } from '../utils/mailsFilters';
import { useAuthContext } from '../hooks/context/useAuthContext';
import { useUserDataContext } from '../hooks/context/useUserDataContext';
import { useMailsDataContext } from '../hooks/context/useMailsDataContext';
import PropTypes from 'prop-types';

const List = ({ mailsData }) => {
  return (
    <>
      {mailsData &&
        mailsData.map((mail, index) => {
          return (
            <Link key={index} to={`/detail/${mail.uid}`}>
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

  const userStats = [
    { label: '名稱', value: userName },
    { label: '身分', value: userRole },
    { label: '登入方式', value: userLoginType },
  ];

  return (
    <Box animation="fade-in 0.5s">
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap="4"
      >
        <GridItem colSpan="1">
          <Card.Root h="100%">
            <Card.Header>
              <HStack>
                <User size={24} />
                <Heading size="2xl">個人資料</Heading>
              </HStack>
            </Card.Header>
            <Card.Body>
              <VStack align="flex-start" color="text">
                <DataList.Root orientation="horizontal">
                  {userStats.map((item) => (
                    <DataList.Item key={item.label}>
                      <DataList.ItemLabel color="text">
                        {item.label}
                      </DataList.ItemLabel>
                      <DataList.ItemValue>{item.value}</DataList.ItemValue>
                    </DataList.Item>
                  ))}
                </DataList.Root>
              </VStack>
            </Card.Body>
          </Card.Root>
        </GridItem>
        <GridItem rowSpan="2" colSpan="1">
          <Card.Root h="100%">
            <Card.Header>
              <HStack>
                <Mails size={24} />
                <Heading size="2xl">最新郵件</Heading>
              </HStack>
            </Card.Header>
            <Card.Body>
              <VStack align="flex-start">
                <List mailsData={thisMonthsMails} />
              </VStack>
            </Card.Body>
          </Card.Root>
        </GridItem>
        <GridItem colSpan="1">
          <Card.Root h="100%">
            <Card.Header>
              <HStack>
                <Users size={24} />
                <Heading size="2xl">郵箱使用人</Heading>
              </HStack>
            </Card.Header>
            <Card.Body>
              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>成員</Table.ColumnHeader>
                    <Table.ColumnHeader>狀態</Table.ColumnHeader>
                    <Table.ColumnHeader>聯絡方式</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {/* {userData?.mailBox?.users?.map((user, index) => (
                      <Table.Row key={index}>
                        <Table.Cell>
                          {user.name} ({user.email})
                        </Table.Cell>
                        <Table.Cell>{user.status}</Table.Cell>
                      </Table.Row>
                    ))} */}
                  <Table.Row>
                    <Table.Cell>Test</Table.Cell>
                    <Table.Cell>使用中</Table.Cell>
                    <Table.Cell>test@gmail.com</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Test2</Table.Cell>
                    <Table.Cell>離開</Table.Cell>
                    <Table.Cell>test2@gmail.com</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table.Root>
            </Card.Body>
          </Card.Root>
        </GridItem>
      </Grid>
    </Box>
  );
}
