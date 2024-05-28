import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Button,
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
import Icon from "../components/ui/Icon";
import { TimeBetween } from "../utils/dateUtils";

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
                    你有一封新信件 - {mail.title}
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
  const { userName, userRole } = userData || {};

  const [userLoginType, setUserLoginType] = useState("");

  useEffect(() => {
    if (isEmailUser) setUserLoginType("Email");
    if (isGoogleUser) setUserLoginType("Google");
  }, [isEmailUser, isGoogleUser]);

  return (
    <>
      <Wrapper>
        <VStack w="400px" spacing="8">
          <Container>
            <SubTitle size="2xl">登入狀態</SubTitle>
            <VStack align="flex-start">
              <Text fontWeight="bold">名稱：{userName}</Text>
              <Text fontWeight="bold">身分：{userRole}</Text>
              <Text fontWeight="bold">登入方式：{userLoginType}</Text>
            </VStack>
          </Container>
          <Container>
            <SubTitle size="2xl">郵箱使用人</SubTitle>
            <HStack mx="8" spacing="6">
              <VStack>
                <Icon name="CircleUserRound" color="white" size={42} />
                <Text fontWeight="600">A</Text>
              </VStack>
              <VStack>
                <Icon name="CircleUserRound" color="white" size={42} />
                <Text fontWeight="600">B</Text>
              </VStack>
              <VStack>
                <Icon name="CircleUserRound" color="white" size={42} />
                <Text fontWeight="600">C</Text>
              </VStack>
              <VStack>
                <Button
                  bg="none"
                  _hover={{
                    bg: "none",
                  }}
                >
                  <Icon name="CirclePlus" color="white" size={42} />
                </Button>
              </VStack>
            </HStack>
          </Container>
        </VStack>
        <Container w="600px">
          <SubTitle size="2xl">重要郵件</SubTitle>
          <VStack divider={<StackDivider borderColor="gray.600" />}>
            <List mailsData={mailsData} />
          </VStack>
        </Container>
      </Wrapper>
    </>
  );
}

export default Home;
