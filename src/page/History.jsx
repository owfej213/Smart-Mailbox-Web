import styled from 'styled-components';
import Container from '../components/Container';
import { Title } from '../components/CommonStyles';
//Chat-GPT寫的，回傳現在年月日
const Today = () => {
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1;
  var day = currentDate.getDate();

  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  var dateString = year + '年' + month + '月' + day + '日';
  return dateString;
}

var Mails = [{
  date: Today(),
  title: '水費',
  type: '信件',
  name: 'Amy',
}]

const Table = styled.div`
  margin-bottom: 0.1em;
  display: flex;
  font-size: 2em;
`
const Header = styled(Table)`
  margin-bottom: 0.5em;
`

const Content = styled(Table)`
  font-size: 1.5em;
`

const Component = styled.div`
  margin: 0 3px;
  padding: 0.4em;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(217, 217, 217);
  font-weight:bold;
`

const Detail = styled(Component)`
  color: rgb(72, 186, 251);
`

const List = () => {
  return Mails.map((item, index) => {
      return (
          <Content key={index}>
            <Component style={{flexBasis: '35%'}}>
              <span>{item.date}</span>
            </Component>
            <Component style={{flexBasis: '20%'}}>
              <span>{item.title}</span>
            </Component>
            <Component style={{flexBasis: '15%'}}>
              <span>{item.type}</span>
            </Component>
            <Component style={{flexBasis: '15%'}}>
              <span>{item.name}</span>
            </Component>
            <Detail style={{flexBasis: '15%'}}>
              <span>查看</span>
            </Detail>
          </Content>
      )
  })
}

function History() {

  return (
    <>
      <Container>
        <Title>歷史紀錄</Title>
        <Header>
          <Component style={{flexBasis: '35%'}}>
            <span>日期</span>
          </Component>
          <Component style={{flexBasis: '20%'}}>
            <span>郵件主題</span>
          </Component>
          <Component style={{flexBasis: '15%'}}>
            <span>類型</span>
          </Component>
          <Component style={{flexBasis: '15%'}}>
            <span>收信人</span>
          </Component>
          <Component style={{flexBasis: '15%'}}>
            <span>細節</span>
          </Component>
        </Header>
        <List />
      </Container>
    </>
  )
}

export default History;