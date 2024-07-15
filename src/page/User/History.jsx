import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Wrapper from "../../components/ui/Wrapper";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Show,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useTheme,
} from "@chakra-ui/react";
import { useMailsData } from "../../components/Context/MailsDataContext";
import { formateDateYMD } from "../../utils/dateUtils";
import { useUserData } from "../../components/Context/UserDataContext";
import Container from "../../components/ui/Container";
import SubTitle from "../../components/ui/SubTitle";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "../../components/ui/Icon";
import { db } from "../../firebase/firebase";
import { collection, deleteDoc, doc } from "firebase/firestore";

const MotionBox = motion(Box);
function TableRow({ children, ...props }) {
  return (
    <>
      <Flex
        maxW="1200px"
        w="100%"
        direction={["column", "column", "row"]}
        {...props}
      >
        {children}
      </Flex>
    </>
  );
}

TableRow.propTypes = {
  children: PropTypes.any,
};

function TableItem({ children, title, ...props }) {
  return (
    <Flex
      p={["2", "3"]}
      w="100%"
      justify={["space-between", "space-between", "center"]}
      {...props}
    >
      {title && (
        <Text fontSize={["lg", "xl", "2xl"]} fontWeight="bold">
          {title}
        </Text>
      )}
      {children && (
        <Text fontSize={["lg", "xl", "2xl"]} fontWeight="bold">
          {children}
        </Text>
      )}
    </Flex>
  );
}

TableItem.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
};

function List({ filteredMails, userData }) {
  const theme = useTheme();
  const { mailBoxID } = userData || {};

  const handleDeleteMail = async (uid) => {
    try {
      const result = doc(
        collection(doc(db, `mailBoxes/${mailBoxID}`), "mails"),
        uid
      );
      await deleteDoc(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {filteredMails &&
        filteredMails.map((mail) => {
          if (mail.visible === false) return;
          if (!mail?.createAt) return;

          let TableRowColor = "";
          let initialTableRowColor = "";
          let currentTime = new Date();

          if (currentTime.getTime() / 1000 - mail.createAt.seconds < 60) {
            initialTableRowColor = theme.colors.red[500];
          } else {
            initialTableRowColor = theme.colors.gray[200];
          }

          if (mail.receiver === userData.userRealName) {
            TableRowColor = theme.colors.green[200];
          } else {
            TableRowColor = theme.colors.gray[200];
          }

          return (
            <Box key={mail.createAt.seconds} w="100%">
              <AnimatePresence>
                <MotionBox
                  initial={{
                    opacity: 0,
                    backgroundColor: initialTableRowColor,
                  }}
                  animate={{
                    opacity: 1,
                    backgroundColor: TableRowColor,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TableRow>
                    <TableItem maxW="300px">
                      {formateDateYMD(mail.createAt.seconds)}
                    </TableItem>
                    <TableItem maxW="250px">{mail.title}</TableItem>
                    <TableItem maxW="200px">{mail.receiver}</TableItem>
                    <TableItem maxW="150px">{mail.urgency}</TableItem>
                    <TableItem maxW="150px">
                      <Link to={`/detail/${mail.uid}`}>
                        <Text
                          fontWeight="bold"
                          color="teal.600"
                          _hover={{
                            color: "teal.400",
                          }}
                        >
                          查看
                        </Text>
                      </Link>
                    </TableItem>
                    <TableItem maxW="150px" align="center">
                      <Button
                        p="0"
                        onClick={() => handleDeleteMail(mail.uid)}
                        bg="transparent"
                      >
                        <Icon name="Trash2" color="red" size="32" />
                      </Button>
                    </TableItem>
                  </TableRow>
                </MotionBox>
              </AnimatePresence>
            </Box>
          );
        })}
    </>
  );
}

List.propTypes = {
  filteredMails: PropTypes.array,
  userData: PropTypes.array,
};

function History() {
  const [myMailsCheckbox, setMyMailsCheckbox] = useState(false);
  const [filteredMails, setFilteredMails] = useState([]);
  const { userData } = useUserData();
  const { mailsData } = useMailsData();

  useEffect(() => {
    setFilteredMails(
      mailsData.map((mail) => {
        mail.visible = true;
        return mail;
      })
    );
    if (myMailsCheckbox && filteredMails) {
      setFilteredMails((prev) => {
        let result = prev.filter((mail) => {
          if (mail.receiver === userData.userRealName) {
            mail.visible = true;
            return true;
          }
          return false;
        });
        return result;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mailsData, myMailsCheckbox]);
  return (
    <>
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Wrapper>
          <VStack spacing="1" maxW="1200px" w="100%">
            <Grid
              maxW="1200px"
              w="100%"
              templateColumns="repeat(8, 1fr)"
              gap={4}
              mb="4"
            >
              <GridItem colSpan={[8, 8, 4]}>
                <Container>
                  <SubTitle>說明</SubTitle>
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>緊急度</Th>
                          <Th>解釋</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td>高</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td>中</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td>低</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td>無</Td>
                          <Td></Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Container>
              </GridItem>
              <GridItem colSpan={[8, 8, 4]}>
                <Container h="100%">
                  <SubTitle>設定</SubTitle>
                  <Box h="100%">
                    <Checkbox
                      onChange={(e) => {
                        setMyMailsCheckbox(e.target.checked);
                      }}
                    >
                      顯示本人郵件
                    </Checkbox>
                  </Box>
                </Container>
              </GridItem>
            </Grid>
            <Show above="md">
              <TableRow bg="gray.400">
                <TableItem maxW="300px" title="收件日期" />
                <TableItem maxW="250px" title="郵件標題" />
                <TableItem maxW="200px" title="收件人" />
                <TableItem maxW="150px" title="緊急度" />
                <TableItem maxW="150px" title="細節" />
                <TableItem maxW="150px" title="刪除" />
              </TableRow>
            </Show>
            <List filteredMails={filteredMails} userData={userData} />
          </VStack>
        </Wrapper>
      </MotionBox>
    </>
  );
}

export default History;
