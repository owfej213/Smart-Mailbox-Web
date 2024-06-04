import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Wrapper from "../../components/ui/Wrapper";
import { Flex, Hide, Show, Text, VStack } from "@chakra-ui/react";
import { useMailsData } from "../../components/Context/MailsDataContext";
import { formateDateYMD } from "../../utils/dateUtils";

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

function TableItem({ children, title, maxW, ...props }) {
  return (
    <Flex
      p={["2", "3"]}
      w="100%"
      justify={["space-between", "space-between", "center"]}
      maxW={maxW}
    >
      <Text fontSize={["lg", "xl", "2xl"]} fontWeight="bold">
        {title}
      </Text>
      <Text fontSize={["lg", "xl", "2xl"]} fontWeight="bold" {...props}>
        {children}
      </Text>
    </Flex>
  );
}

TableItem.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  maxW: PropTypes.string,
};

function List({ mailsData, ...props }) {
  return (
    <>
      {mailsData &&
        mailsData.map((mail, index) => {
          return (
            <>
              <Show above="md">
                <TableRow key={index} {...props}>
                  <TableItem maxW="300px">
                    {formateDateYMD(mail?.createAt?.seconds)}
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
              </Show>
              <Hide above="md">
                <TableRow bg="gray.300">
                  <TableItem title="收件日期">
                    {formateDateYMD(mail?.createAt?.seconds)}
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
              </Hide>
            </>
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
      <Wrapper>
        <VStack spacing="1" maxW="1000px" w="100%">
          <Show above="md">
            <TableRow bg="gray.400">
              <TableItem maxW="300px" title="收件日期" />
              <TableItem maxW="250px" title="郵件標題" />
              <TableItem maxW="150px" title="收信人" />
              <TableItem maxW="150px" title="緊急度" />
              <TableItem maxW="150px" title="細節" />
            </TableRow>
          </Show>
          <List bg="gray.300" mailsData={mailsData} />
        </VStack>
      </Wrapper>
    </>
  );
}

export default History;
