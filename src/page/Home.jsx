import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MainTitle from "../components/ui/MainTitle";
import { Box, HStack, StackDivider, Text, VStack } from "@chakra-ui/react";
import Wrapper from "../components/ui/Wrapper";
import Container from "../components/ui/Container";
import SubTitle from "../components/ui/SubTitle";
import { useUserData } from "../components/Context/UserDataContext";
import { useMailsData } from "../components/Context/MailsDataContext";
import { useAuth } from "../components/Context/AuthContext";
import { useEffect, useState } from "react";

function calculateTimeDifference(start, end) {
  var difference = Math.abs(end - start);
  var daysDifference = Math.floor(difference / (60 * 60 * 24));
  var hoursDifference = Math.floor((difference % (60 * 60 * 24)) / (60 * 60));
  var minutesDifference = Math.floor((difference % (60 * 60)) / 60);

  if (daysDifference > 0) {
    return daysDifference + "天前";
  } else if (hoursDifference > 0) {
    return hoursDifference + "小時前";
  } else {
    return minutesDifference + "分鐘前";
  }
}

const List = ({ mailsData }) => {
  return (
    <>
      {mailsData &&
        mailsData.map((mail, index) => {
          const { createAt } = mail;
          return (
            <Box key={index}>
              <Link to={`/home/history/${mail.uid}`}>
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
                    -{" "}
                    {calculateTimeDifference(
                      createAt.seconds,
                      new Date().getTime() / 1000
                    )}
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
  const { userName, userType } = userData || {};

  const [userLoginType, setUserLoginType] = useState("");

  useEffect(() => {
    if (isEmailUser) setUserLoginType("Email");
    if (isGoogleUser) setUserLoginType("Google");
  }, []);

  return (
    <>
      <MainTitle>主頁</MainTitle>
      <Wrapper>
        <VStack w="300px" spacing="8">
          <Container>
            <SubTitle>登入狀態</SubTitle>
            <VStack align="flex-start">
              <Text fontWeight="bold">名稱：{userName}</Text>
              <Text fontWeight="bold">身分：{userType}</Text>
              <Text fontWeight="bold">登入方式：{userLoginType}</Text>
            </VStack>
          </Container>
          <Container>
            <SubTitle>郵箱使用人</SubTitle>
          </Container>
        </VStack>
        <Container w="500px">
          <SubTitle>重要郵件</SubTitle>
          <VStack divider={<StackDivider borderColor="gray.600" />}>
            <List mailsData={mailsData} />
          </VStack>
        </Container>
      </Wrapper>
    </>
  );
}

export default Home;
