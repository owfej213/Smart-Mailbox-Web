import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Wrapper from "../../components/ui/Wrapper";
import {
  Box,
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
} from "@chakra-ui/react";
import { useMailsData } from "../../components/Context/MailsDataContext";
import { formateDateYMD } from "../../utils/dateUtils";
import { useUserData } from "../../components/Context/UserDataContext";
import Container from "../../components/ui/Container";
import SubTitle from "../../components/ui/SubTitle";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MotionBox = motion(Box);
function TableRow({ children, ...props }) {
  return (
    <>
      <Flex
        maxW="1000px"
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
  return (
    <>
      {filteredMails &&
        filteredMails.map((mail) => {
          if (mail.visible === false) return;
          if (!mail?.createAt) return;

          let TableRowColor = "";

          if (mail.receiver === userData.userRealName) {
            TableRowColor = "cyan.100";
          } else {
            TableRowColor = "gray.300";
          }

          return (
            <Box key={mail.createAt.seconds} w="100%">
              <AnimatePresence>
                <MotionBox
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* <Show above="md"> */}
                  <TableRow bg={TableRowColor}>
                    <TableItem maxW="300px">
                      {formateDateYMD(mail.createAt.seconds)}
                    </TableItem>
                    <TableItem maxW="250px">{mail.title}</TableItem>
                    <TableItem maxW="150px">{mail.receiver}</TableItem>
                    <TableItem maxW="150px">{mail.urgency}</TableItem>
                    <TableItem
                      maxW="150px"
                      fontWeight="bold"
                      color="teal.600"
                      _hover={{
                        color: "teal.400",
                      }}
                    >
                      <Link to={`/detail/${mail.uid}`}>查看</Link>
                    </TableItem>
                  </TableRow>
                  {/* </Show> */}
                  {/* <Hide above="md">
                    <TableRow bg={TableRowColor}>
                      <TableItem title="收件日期">
                        {formateDateYMD(mail.createAt.seconds)}
                      </TableItem>
                      <TableItem title="郵件標題">{mail.title}</TableItem>
                      <TableItem title="收信人">{mail.receiver}</TableItem>
                      <TableItem title="緊急度">{mail.urgency}</TableItem>
                      <TableItem
                        title="細節"
                        fontWeight="bold"
                        color="teal.600"
                        _hover={{
                          color: "teal.400",
                        }}
                      >
                        <Link to={`/detail/${mail.uid}`}>查看</Link>
                      </TableItem>
                    </TableRow>
                  </Hide> */}
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
  }, [filteredMails, mailsData, myMailsCheckbox, userData]);
  return (
    <>
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Wrapper>
          <VStack spacing="1" maxW="1000px" w="100%">
            <Grid
              maxW="1000px"
              w="100%"
              templateColumns="repeat(8, 1fr)"
              gap={4}
            >
              <GridItem colSpan={[8, 8, 4]}>
                <Container mb="4">
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
                <Container mb="8">
                  {" "}
                  <SubTitle>設定</SubTitle>
                  <Checkbox
                    onChange={(e) => {
                      setMyMailsCheckbox(e.target.checked);
                    }}
                  >
                    顯示本人郵件
                  </Checkbox>
                </Container>
              </GridItem>
            </Grid>

            <Show above="md">
              <TableRow bg="gray.400">
                <TableItem maxW="300px" title="收件日期" />
                <TableItem maxW="250px" title="郵件標題" />
                <TableItem maxW="150px" title="收件人" />
                <TableItem maxW="150px" title="緊急度" />
                <TableItem maxW="150px" title="細節" />
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
