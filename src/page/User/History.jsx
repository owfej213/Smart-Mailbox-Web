import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Wrapper from "../../components/ui/Wrapper";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Show,
  Switch,
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
function TableRow({ children, isTitle, ...props }) {
  return (
    <>
      <Flex
        maxW="1200px"
        w="100%"
        direction={["column", "column", "row"]}
        bg={isTitle ? "gray.400" : {}}
        borderWidth={isTitle ? {} : "3px"}
        _hover={isTitle ? {} : { borderWidth: "3px", borderColor: "blue.500" }}
        {...props}
      >
        {children}
      </Flex>
    </>
  );
}

TableRow.propTypes = {
  children: PropTypes.any,
  isTitle: PropTypes.bool,
};

function TableItem({ children, title, ...props }) {
  return (
    <Flex
      p={["2", "3"]}
      w="100%"
      justify={["space-between", "space-between", "center"]}
      align="center"
      {...props}
    >
      {title && (
        <Box fontSize={["lg", "xl", "2xl"]} fontWeight="bold">
          {title}
        </Box>
      )}
      {children && (
        <Box fontSize={["lg", "xl", "2xl"]} fontWeight="bold">
          {children}
        </Box>
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

          if (mail.receiver === userData.userRealName) {
            TableRowColor = theme.colors.green[200];
          } else {
            TableRowColor = theme.colors.gray[200];
          }

          if (currentTime.getTime() / 1000 - mail.createAt.seconds < 300) {
            initialTableRowColor = theme.colors.red[500];
            TableRowColor = theme.colors.red[200];
          } else {
            initialTableRowColor = theme.colors.gray[200];
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
                        <Icon name="Trash2" color="red" size={32} />
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
  userData: PropTypes.any,
};

function History() {
  const [myMailsCheckbox, setMyMailsCheckbox] = useState(false);
  const [voiceNotifyEnable, setVoiceNotifyEnable] = useState(false);
  const [filteredMails, setFilteredMails] = useState([]);
  const [newMail, setNewMail] = useState(null);
  const { userData } = useUserData();
  const { mailsData } = useMailsData();

  useEffect(() => {
    var storedSettings = JSON.parse(localStorage.getItem("voiceNotifyEnable"));
    setVoiceNotifyEnable(storedSettings);
  }, []);

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

  useEffect(() => {
    if (newMail && voiceNotifyEnable) {
      const { receiver, title, urgency } = newMail;
      const message = `有一封新郵件已送達，標題 ${title}，收件人 ${receiver}，緊急度 ${urgency}`;
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = "zh-TW";
      window.speechSynthesis.speak(utterance);
    }
  }, [newMail, voiceNotifyEnable]);

  useEffect(() => {
    if (filteredMails) {
      const currentTime = new Date().getTime() / 1000;
      const newMail = filteredMails.find((mail) => {
        return (
          mail.visible !== false &&
          mail.createAt &&
          currentTime - mail.createAt.seconds < 300
        );
      });

      if (newMail) {
        setNewMail(newMail);
      }
    }
  }, [filteredMails]);

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
                          <Td>具時效性與繳費、公家機關相關之郵件</Td>
                        </Tr>
                        <Tr>
                          <Td>中</Td>
                          <Td>建議使用者查看之郵件</Td>
                        </Tr>
                        <Tr>
                          <Td>無</Td>
                          <Td>無限期，可不需查看之郵件</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Container>
              </GridItem>
              <GridItem colSpan={[8, 8, 4]}>
                <Container h="100%">
                  <SubTitle>設定</SubTitle>
                  <VStack h="100%" align="flex-start">
                    <FormControl display="flex" alignItems="center">
                      <Switch
                        id="voiceNotifyEnable"
                        isChecked={voiceNotifyEnable}
                        onChange={(e) => {
                          var isChecked = e.target.checked;
                          setVoiceNotifyEnable(isChecked);
                          localStorage.setItem(
                            "voiceNotifyEnable",
                            isChecked.toString()
                          );
                        }}
                      />
                      <FormLabel mb="0" ml="2">
                        開啟語音
                      </FormLabel>
                    </FormControl>
                    <FormControl display="flex" alignItems="center">
                      <Switch
                        id="myMails"
                        onChange={(e) => {
                          setMyMailsCheckbox(e.target.checked);
                        }}
                      />
                      <FormLabel mb="0" ml="2">
                        顯示本人郵件
                      </FormLabel>
                    </FormControl>
                  </VStack>
                </Container>
              </GridItem>
            </Grid>
            <Show above="md">
              <TableRow isTitle>
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
