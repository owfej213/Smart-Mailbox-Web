import Wrapper from "../../components/ui/Wrapper";
import Container from "../../components/ui/Container";
import { motion } from "framer-motion";
import {
  Button,
  Flex,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";

function Admin() {
  return (
    <>
      <Wrapper>
        <Container w="1000px">
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
            <Text fontSize="xl">1 - 1</Text>
            <Flex w="80%" justify="space-between">
              <motion.div whileHover={{ scale: 1.2 }}>
                <Tooltip hasArrow label="最後取信時間：2024/5/14">
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
                <Tooltip hasArrow label="信箱空間：滿">
                  <Button
                    borderRadius="full"
                    size="xs"
                    bg="red.600"
                    _hover={{
                      bg: "red.600",
                    }}
                  ></Button>
                </Tooltip>
              </motion.div>
            </Flex>
          </VStack>
        </Container>
      </Wrapper>
    </>
  );
}

export default Admin;
