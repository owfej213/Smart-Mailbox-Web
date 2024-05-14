import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MainTitle from "../../components/ui/MainTitle";
import Wrapper from "../../components/ui/Wrapper";
import { Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useMailsData } from "../../components/Context/MailsDataContext";

function TableRow({ children, ...props }) {
  return (
    <>
      <HStack maxW="1000px" w="100%" {...props}>
        {children}
      </HStack>
    </>
  );
}

TableRow.propTypes = {
  children: PropTypes.any,
};

function TableItem({ children, ...props }) {
  return (
    <Flex p="4" width={["50%", "100%"]} {...props}>
      <Text fontSize="2xl" fontWeight="bold">
        {children}
      </Text>
    </Flex>
  );
}

TableItem.propTypes = {
  data: PropTypes.any,
  children: PropTypes.any,
};

function List({ mailsData, ...props }) {
  return (
    <>
      {mailsData &&
        mailsData.map((mail, index) => {
          return (
            <TableRow key={index} {...props}>
              <TableItem maxW="300px" justify="center">
                {mail.date}
              </TableItem>
              <TableItem maxW="250px" justify="center">
                {mail.title}
              </TableItem>
              <TableItem maxW="150px" justify="center">
                {mail.receiver}
              </TableItem>
              <TableItem maxW="150px" justify="center">
                {mail.urgency}
              </TableItem>
              <TableItem
                maxW="150px"
                justify="center"
                fontWeight="bold"
                color="teal.600"
                _hover={{
                  color: "teal.400",
                }}
              >
                <Link to={`/home/history/${mail.uid}`}>查看</Link>
              </TableItem>
            </TableRow>
          );
        })}
    </>
  );
}

List.propTypes = {
  mailsData: PropTypes.array,
};

function History() {
  const { mailsData } = useMailsData();

  return (
    <>
      <MainTitle>歷史紀錄</MainTitle>
      <Wrapper>
        <VStack spacing="1" maxW="1000px" w="100%">
          <TableRow
            bg="gray.400"
          >
            <TableItem maxW="300px" justify="center">
              日期
            </TableItem>
            <TableItem maxW="250px" justify="center">
              郵件標題
            </TableItem>
            <TableItem maxW="150px" justify="center">
              收信人
            </TableItem>
            <TableItem maxW="150px" justify="center">
              緊急度
            </TableItem>
            <TableItem maxW="150px" justify="center">
              細節
            </TableItem>
          </TableRow>
          <List bg="gray.300" mailsData={mailsData} />
        </VStack>
      </Wrapper>
    </>
  );
}

export default History;
