import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, HStack, StackDivider, Text, VStack } from "@chakra-ui/react";
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
      <Wrapper>
        <VStack w={["100%", "100%", "400px"]} spacing="8">
          <Container>
            <SubTitle size="2xl">登入狀態</SubTitle>
            <VStack align="flex-start">
              <Text fontWeight="bold">名稱：{userName}</Text>
              <Text fontWeight="bold">身分：{userRole}</Text>
              <Text fontWeight="bold">登入方式：{userLoginType}</Text>
            </VStack>
          </Container>
          <Container>
            <MailBoxUserModal mailBoxID={mailBoxID} />
          </Container>
        </VStack>
        <Container w={["100%", "100%", "600px"]}>
          <SubTitle size="2xl">重要郵件</SubTitle>
          <VStack divider={<StackDivider borderColor="gray.600" />}>
            <List mailsData={monthsMail} />
          </VStack>
        </Container>
      </Wrapper>
    </>
  );
}

export default Home;
