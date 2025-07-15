import { Box, Image } from '@chakra-ui/react';

export default function Logo() {
  return (
    <Box
      w="40px"
      h="40px"
      cursor="pointer"
      _hover={{ scale: 1.2 }}
      transition="scale 0.2s"
    >
      <Image src="../../../images/postbox.png" alt="SmartMailBox" />
    </Box>
  );
}
