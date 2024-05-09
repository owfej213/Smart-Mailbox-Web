import { useState } from "react";
import MainTitle from "../../components/ui/MainTitle";
import Wrapper from "../../components/ui/Wrapper";
import { Box, Button, Flex, Image, VStack } from "@chakra-ui/react";

const Now = () => {
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1;
  var day = currentDate.getDate();
  var hour = currentDate.getHours();
  var Minute = currentDate.getMinutes();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hour = hour < 10 ? "0" + hour : hour;
  Minute = Minute < 10 ? "0" + Minute : Minute;

  var dateString = `${year}年${month}月${day}日${hour}時${Minute}分`;
  return dateString;
};

const NoImage = () => {
  return <Image w="100px" h="100px" src="../../images/mail.png" />;
};

// const RandomImage = ({ seed }) => {

//   var url = `https://picsum.photos/800/600?random=${seed}`;

//   return (
//     <img src={url}></img>
//   )
// }

function InsideBox() {
  // eslint-disable-next-line no-unused-vars
  const [imageExists, setImgaeExists] = useState(true);
  const [reloadKey, SetReloadKey] = useState(0);

  const time = Now();

  function handleReload() {
    SetReloadKey((prevkey) => prevkey + 1);
  }

  return (
    <>
      <MainTitle>郵箱內部</MainTitle>
      <Wrapper>
        <VStack>
          <Flex
            key={reloadKey}
            bg="gray.300"
            w="900px"
            h="600px"
            align="center"
            justify="center"
          >
            <NoImage />
            {/* {imageExists ? <RandomImage seed= {reloadKey} />: <NoImage />} */}
          </Flex>
          <Box my="4" color="white">
            上次更新時間：{time}
          </Box>
          <Button
            onClick={handleReload}
            p="4"
            width="150px"
            borderRadius="20px"
          >
            更新
          </Button>
        </VStack>
      </Wrapper>
    </>
  );
}

export default InsideBox;
