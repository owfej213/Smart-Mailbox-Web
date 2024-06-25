import Wrapper from "../../components/ui/Wrapper";
import { useUserData } from "../../components/Context/UserDataContext";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  VStack,
} from "@chakra-ui/react";

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

function SendMail() {
  const { userData } = useUserData();
  const { mailBoxID } = userData || {};

  const [mailsRef, setMailsRef] = useState(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [receiver, setReceiver] = useState("");
  const [sender, setSender] = useState("");
  const [senderCompany, setSenderCompany] = useState("");
  const [urgency, setUrgency] = useState("");
  const [keyContent, setKeyContent] = useState("");

  useEffect(() => {
    if (mailBoxID !== null) {
      const result = collection(doc(db, `mailBoxes/${mailBoxID}`), "mails");

      setMailsRef(result);
    }
  }, [mailBoxID]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(mailsRef, {
        date: Today(),
        title: title,
        type: type,
        receiver: receiver,
        sender: sender,
        senderCompany: senderCompany,
        urgency: urgency,
        keyContent: keyContent,
        createAt: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Wrapper>
        <Card variant="test" w="800px">
          <CardBody>
            <form onSubmit={onSubmit}>
              <VStack px="8" spacing="8">
                <FormControl as={HStack}>
                  <FormLabel w="200px">標題</FormLabel>
                  <Input
                    maxLength={20}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </FormControl>
                <RadioGroup onChange={setTitle} value={title}>
                  <Stack direction="row">
                    <Radio value="電費">電費</Radio>
                    <Radio value="水費">水費</Radio>
                    <Radio value="電話費">電話費</Radio>
                    <Radio value="成績單">成績單</Radio>
                  </Stack>
                </RadioGroup>
                <FormControl as={HStack}>
                  <FormLabel w="200px">類型</FormLabel>
                  <Input
                    maxLength={20}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                  />
                </FormControl>
                <RadioGroup onChange={setType} value={type}>
                  <Stack direction="row">
                    <Radio value="公家單位">公家單位</Radio>
                    <Radio value="一般信件">一般信件</Radio>
                    <Radio value="廣告">廣告</Radio>
                  </Stack>
                </RadioGroup>
                <FormControl as={HStack}>
                  <FormLabel w="200px">收件人</FormLabel>
                  <Input
                    onChange={(e) => {
                      setReceiver(e.target.value);
                    }}
                  />
                </FormControl>
                <RadioGroup onChange={setReceiver} value={receiver}>
                  <Stack direction="row">
                    <Radio value="A">A</Radio>
                    <Radio value="B">B</Radio>
                    <Radio value="C">C</Radio>
                  </Stack>
                </RadioGroup>
                <FormControl as={HStack}>
                  <FormLabel w="200px">寄件人</FormLabel>
                  <Input
                    onChange={(e) => {
                      setSender(e.target.value);
                    }}
                  />
                </FormControl>
                <RadioGroup onChange={setSender} value={sender}>
                  <Stack direction="row">
                    <Radio value="台南大學">台南大學</Radio>
                  </Stack>
                </RadioGroup>
                <FormControl as={HStack}>
                  <FormLabel w="200px">寄件人單位或地址</FormLabel>
                  <Input
                    onChange={(e) => {
                      setSenderCompany(e.target.value);
                    }}
                  />
                </FormControl>
                <RadioGroup onChange={setSenderCompany} value={senderCompany}>
                  <Stack direction="row">
                    <Radio value="台南大學">台南大學</Radio>
                  </Stack>
                </RadioGroup>
                <FormControl as={HStack}>
                  <FormLabel w="200px">緊急度</FormLabel>
                  <Input
                    onChange={(e) => {
                      setUrgency(e.target.value);
                    }}
                  />
                </FormControl>
                <RadioGroup onChange={setUrgency} value={urgency}>
                  <Stack direction="row">
                    <Radio value="低">低</Radio>
                    <Radio value="中">中</Radio>
                    <Radio value="高">高</Radio>
                  </Stack>
                </RadioGroup>
                <FormControl as={HStack}>
                  <FormLabel w="200px">關鍵內容</FormLabel>
                  <Input
                    onChange={(e) => {
                      setKeyContent(e.target.value);
                    }}
                  />
                </FormControl>
                <Button type="submit" mt="4" colorScheme="green">
                  上傳
                </Button>
              </VStack>
            </form>
          </CardBody>
        </Card>
      </Wrapper>
    </>
  );
}

export default SendMail;
