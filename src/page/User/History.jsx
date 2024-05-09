import { db } from "../../firebase/firebase";
import { collection, addDoc, serverTimestamp, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MainTitle from "../../components/ui/MainTitle";
import Wrapper from "../../components/ui/Wrapper";
import { Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useMailsData } from "../../components/Context/MailsDataContext";
import { useUserData } from "../../components/Context/UserDataContext";

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
//Chat-GPT寫的，回傳現在年月日
const Today = () => {
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1;
  var day = currentDate.getDate();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  var dateString = year + "年" + month + "月" + day + "日";
  return dateString;
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
                {mail.name}
              </TableItem>
              <TableItem maxW="150px" justify="center">
                {mail.level}
              </TableItem>
              <TableItem maxW="150px" justify="center">
                <Link to={`/home/history/${mail.uid}`}>
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
  const { userData } = useUserData();
  const { mailsData } = useMailsData();
  const { mailBoxID } = userData || {};

  const [formValue, setFormValue] = useState("");
  const [mailsRef, setMailsRef] = useState(null);

  useEffect(() => {
    if (mailBoxID !== null) {
      const result = collection(doc(db, `mailBoxes/${mailBoxID}`), "mails");

      setMailsRef(result);
    }
  }, [mailBoxID]);

  const onSubmit = async (e) => {
    e.preventDefault();

    var word = formValue.split(" ");
    try {
      await addDoc(mailsRef, {
        date: Today(),
        title: word[0],
        type: word[1],
        name: word[2],
        createAt: serverTimestamp(),
      });
      setFormValue("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MainTitle>歷史紀錄</MainTitle>
      <Wrapper>
        <VStack spacing="1" maxW="1000px" w="100%">
          <TableRow
            bg="gray.400"
            borderTopLeftRadius="16"
            borderTopRightRadius="16"
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
          <form onSubmit={onSubmit}>
            <input
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
            />
            <Button type="submit">發送</Button>
          </form>
        </VStack>
      </Wrapper>
    </>
  );
}

export default History;
