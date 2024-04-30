/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import styled from "@emotion/styled";
import { Title, StyledButton, Wrapper } from '../components/CommonStyles';

const Image = styled.div`
  background-color: white;
  margin: 0 auto;
  width: 800px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Icon = styled.img`
  width: 100px;
  height: 100px;
`

const UpdateTime = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
  color: white;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bolder;
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

const RandomImage = ({ seed }) => {

  var url = `https://picsum.photos/800/600?random=${seed}`;

  return (
    <img src={url}></img>
  )
}

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
      <Wrapper>
        <Title fontSize={[3, 4, 5, 6]}>郵箱內部</Title>
        <Content>
          <Image key={reloadKey}>
          <NoImage />
            {/* {imageExists ? <RandomImage seed= {reloadKey} />: <NoImage />} */}
          </Image>
          <UpdateTime>上次更新時間：{ time }</UpdateTime>
            <StyledButton
              onClick={ handleReload } 
              width="12em" 
              borderRadius="20px"
              p="0.8em"
              >
              更新
            </StyledButton>
        </Content>
      </Wrapper>
    </>
  );
}

export default InsideBox;
