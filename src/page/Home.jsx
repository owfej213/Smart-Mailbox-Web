import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import Wrapper from "../components/ui/Wrapper";
import Container from "../components/ui/Container";
import SubTitle from "../components/ui/SubTitle";
import { useUserData } from "../components/Context/UserDataContext";
import { useMailsData } from "../components/Context/MailsDataContext";
import { useAuth } from "../components/Context/AuthContext";
import { useEffect, useState } from "react";
import { TimeBetween } from "../utils/dateUtils";
import MailBoxUserModal from "../components/layout/MailBoxUserModal";
import { monthsMailFilter } from "../utils/mailsFilters";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const List = ({ mailsData }) => {
  return (
    <>
      {mailsData &&
        mailsData.map((mail, index) => {
          const { createAt } = mail;
          const { seconds } = createAt || {};
          if (mail.urgency !== "高") return;
          return (
            <Box key={index}>
              <Link to={`/detail/${mail.uid}`}>
                <HStack>
                  <Text
                    fontWeight="bold"
                    fontSize="large"
                    color="teal.600"
                    _hover={{
                      color: "teal.400",
                    }}
                  >
                    {mail.title}
                  </Text>
                  <Text fontWeight="bold" fontSize="small">
                    - {TimeBetween(seconds, new Date().getTime() / 1000)}
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

function Home() {
  const { isGoogleUser, isEmailUser } = useAuth();
  const { userData } = useUserData();
  const { mailsData } = useMailsData();
  const { userName, userRole, mailBoxID } = userData || {};
  const [monthsMail, setMonthsMail] = useState([]);
  const [userLoginType, setUserLoginType] = useState("");

  useEffect(() => {
    if (isEmailUser) setUserLoginType("Email");
    if (isGoogleUser) setUserLoginType("Google");
    setMonthsMail(monthsMailFilter(mailsData));
  }, [isEmailUser, isGoogleUser, mailsData]);

  return (
    <>
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Wrapper>
          <Grid maxW="1000px" w="100%" templateColumns="repeat(8, 1fr)" gap={4}>
            <GridItem colSpan="4">
              <Container>
                <SubTitle size="2xl">登入狀態</SubTitle>
                <VStack align="flex-start">
                  <Text fontWeight="bold">名稱：{userName}</Text>
                  <Text fontWeight="bold">身分：{userRole}</Text>
                  <Text fontWeight="bold">登入方式：{userLoginType}</Text>
                </VStack>
              </Container>
            </GridItem>
            <GridItem colSpan="4">
              <Container h="100%">
                <SubTitle size="2xl">郵箱使用人</SubTitle>
                <MailBoxUserModal mailBoxID={mailBoxID} />
              </Container>
            </GridItem>
            <GridItem colSpan="8">
              <Container>
                <SubTitle size="2xl">重要郵件</SubTitle>
                <VStack divider={<StackDivider borderColor="gray.600" />}>
                  <List mailsData={monthsMail} />
                </VStack>
              </Container>
            </GridItem>
          </Grid>
        </Wrapper>
      </MotionBox>
    </>
  );
}

export default Home;
