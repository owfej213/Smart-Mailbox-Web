import Wrapper from "../../components/ui/Wrapper";
import Container from "../../components/ui/Container";
import { motion } from "framer-motion";
import {
  Button,
  Center,
  Flex,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import SubTitle from "../../components/ui/SubTitle";
import PropTypes from "prop-types";

function MailBox({ isDefault, time, space }) {
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
        <Text fontSize="xl">1 - 1</Text>
      </Tooltip>
      <Flex w="80%" justify="space-between">
        <motion.div whileHover={{ scale: 1.2 }}>
          <Tooltip
            isOpen={isDefault}
            hasArrow
            placement={isDefault ? "left" : "bottom"}
            label={isDefault ? "最後取信時間" : "最後取信時間：2024/5/25"}
          >
            <Button
              borderRadius="full"
              size="xs"
              bg="green.600"
              _hover={{
                bg: "green.600",
              }}
            ></Button>
          </Tooltip>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }}>
          <Tooltip
            isOpen={isDefault}
            hasArrow
            placement={isDefault ? "right" : "bottom"}
            label={isDefault ? "信箱空間" : "信箱空間：滿"}
          >
            <Button
              borderRadius="full"
              size="xs"
              bg={isDefault ? "green.600" : "red.600"}
              _hover={{
                bg: isDefault ? "green.600" : "red.600",
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
};

function Admin() {
  return (
    <>
      <Wrapper>
        <Flex w="300px" direction="column">
          <SubTitle size="2xl">大樓郵箱</SubTitle>
          <SubTitle size="xl">地址：XX市XX區XX路</SubTitle>
          <Center pt="6">
            <MailBox isDefault />
          </Center>
        </Flex>
        <Container w="800px">
          <MailBox/>
        </Container>
      </Wrapper>
    </>
  );
}

export default Admin;
