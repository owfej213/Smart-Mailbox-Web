import { useState } from "react";
import styled from "@emotion/styled";
import { StyledButton } from '../../components/CommonStyles';
import Wrapper from "../../components/layout/Wrapper";
import Box from "../../components/ui/Box";

const Icon = styled.img`
  width: 100px;
  height: 100px;
`

const Now = () => {
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1;
  var day = currentDate.getDate();
  var hour = currentDate.getHours();
  var Minute = currentDate.getMinutes();

  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  hour = hour < 10 ? '0' + hour : hour;
  Minute = Minute < 10 ? '0' + Minute : Minute;

  var dateString = `${year}年${month}月${day}日${hour}時${Minute}分`;
  return dateString;
}

const NoImage = () => {
  return (
    <Icon src="../../images/mail.png" />
  )
}

// const RandomImage = ({ seed }) => {

//   var url = `https://picsum.photos/800/600?random=${seed}`;

//   return (
//     <img src={url}></img>
//   )
// }

function InsideBox() {
  // eslint-disable-next-line no-unused-vars
  const [ imageExists, setImgaeExists ] = useState(true);
  const [ reloadKey, SetReloadKey ] = useState(0);

  const time = Now();

  function handleReload() {
    SetReloadKey((prevkey) => prevkey + 1);
  }

  return (
    <>
      <Wrapper title="郵箱內部">
        <Box
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Box
            key={reloadKey}
            bg={"secondary-background"}
            // margin: 0 auto;
            width={"900px"}
            height={"600px"}
            alignItems={"center"}
            justifyContent={"center"}
          >
          <NoImage />
            {/* {imageExists ? <RandomImage seed= {reloadKey} />: <NoImage />} */}
          </Box>
          <Box
            my={3}
            color={"primary-text"}
          >
            上次更新時間：{ time }
          </Box>
          <StyledButton
            onClick={ handleReload } 
            width={"150px"}
            borderRadius={"20px"}
            p={"10px"}
          >
            更新
          </StyledButton>
        </Box>
      </Wrapper>
    </>
  )
}

export default InsideBox;