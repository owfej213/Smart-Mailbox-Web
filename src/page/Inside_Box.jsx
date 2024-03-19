import styled from "styled-components";
import Container from '../components/Container';
import { Title } from '../components/CommonStyles';

const Image = styled.div`
  background-color: white;
  margin: 0 auto;
  width: 1000px;
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

const UpdateTimeBtn = styled.button`
  width: 12em;
  padding: 1em;
  background-color: white;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  color: black;
  cursor: pointer;
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

function Inside_Box() {

  const time = Now();

  return (
    <>
      <Container>
        <Title>郵箱內部</Title>
        <Content>
          <Image>
            <Icon src="images/mail.png"></Icon>
          </Image>
          <UpdateTime>上次更新時間：{ time }</UpdateTime>
          <UpdateTimeBtn>更新</UpdateTimeBtn>
        </Content>
      </Container>
    </>
  );
}

export default Inside_Box;
