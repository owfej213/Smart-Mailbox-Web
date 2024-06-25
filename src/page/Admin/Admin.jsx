import Wrapper from "../../components/ui/Wrapper";
import Container from "../../components/ui/Container";
import { motion } from "framer-motion";
import {
  Button,
  Center,
  Flex,
  HStack,
  StackDivider,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import SubTitle from "../../components/ui/SubTitle";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function MailBox({ isDefault, time, space, adress }) {
  const [mailTime, setMailTime] = useState("");
  const [mailSpace, setMailSpace] = useState("");
  const [mailSpaceText, setMailSpaceText] = useState("");
  const [mailTimeText, setMailTimeText] = useState("");

  useEffect(() => {
    switch (space) {
      case 0:
        setMailSpace("green.500");
        setMailSpaceText("郵箱空間：未有郵件");
        break;
      case 1:
        setMailSpace("yellow.500");
        setMailSpaceText("郵箱空間：存有郵件");
        break;
      case 2:
        setMailSpace("red.500");
        setMailSpaceText("郵箱空間：郵箱已滿");
        break;
      default:
        setMailSpace("green.500");
        setMailSpaceText("郵箱空間");
        break;
    }
    switch (time) {
      case 0:
        setMailTime("green.500");
        setMailTimeText("最後取信時間：2024/6/10");
        break;
      case 1:
        setMailTime("yellow.500");
        setMailTimeText("最後取信時間：2024/6/2");
        break;
      case 2:
        setMailTime("red.500");
        setMailTimeText("最後取信時間：2024/5/10");
        break;
      default:
        setMailTime("green.500");
        setMailTimeText("最後取信時間");
        break;
    }
  }, [time, space]);

  return (
    <VStack
      bg="gray.200"
      w="120px"
      h="150px"
      borderRadius="20px"
      justify="space-around"
      _before={{
        content: '""',
        display: "block",
        w: "50%",
        h: "10px",
        mt: "24px",
        borderRadius: "5px",
        bg: "gray.800",
      }}
    >
      <Tooltip
        isOpen={isDefault}
        isDisabled={!isDefault}
        hasArrow
        placement="left"
        label="樓層 - 號碼"
      >
        <Text fontSize="xl">{adress}</Text>
      </Tooltip>
      <Flex w="80%" justify="space-between">
        <motion.div whileHover={{ scale: 1.2 }}>
          <Tooltip
            isOpen={isDefault}
            hasArrow
            placement={isDefault ? "left" : "bottom"}
            label={mailTimeText}
          >
            <Button
              borderRadius="full"
              size="xs"
              bg={mailTime}
              _hover={{
                bg: mailTime,
              }}
            ></Button>
          </Tooltip>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }}>
          <Tooltip
            isOpen={isDefault}
            hasArrow
            placement={isDefault ? "right" : "bottom"}
            label={mailSpaceText}
          >
            <Button
              borderRadius="full"
              size="xs"
              bg={mailSpace}
              _hover={{
                bg: mailSpace,
              }}
            ></Button>
          </Tooltip>
        </motion.div>
      </Flex>
    </VStack>
  );
}

MailBox.propTypes = {
  isDefault: PropTypes.bool,
  time: PropTypes.number,
  space: PropTypes.number,
  adress: PropTypes.string,
};

function Admin() {
  return (
    <>
      <Wrapper>
        <Flex w="300px" direction="column">
          <SubTitle size="2xl">大樓郵箱</SubTitle>
          <SubTitle size="xl">地址：XX市XX區XX路</SubTitle>
          <Center pt="6">
            <MailBox isDefault adress="1 - 1" />
          </Center>
        </Flex>
        <Container w="800px">
          <VStack
            align="left"
            spacing="4"
            divider={<StackDivider borderColor="gray.200" />}
          >
            <HStack spacing="6">
              <MailBox time={0} space={2} adress="1 - 1" />
              <MailBox time={0} space={1} adress="1 - 2" />
            </HStack>
            <HStack spacing="6">
              <MailBox time={1} space={0} adress="2 - 1" />
              <MailBox time={2} space={2} adress="2 - 2" />
            </HStack>
          </VStack>
        </Container>
      </Wrapper>
    </>
  );
}

export default Admin;
