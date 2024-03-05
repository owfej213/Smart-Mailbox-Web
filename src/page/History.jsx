import '../css/History.css'

var currentDate = new Date()
var year = currentDate.getFullYear()
var month = currentDate.getMonth() + 1
var day = currentDate.getDate()

month = month < 10 ? '0' + month : month;
day = day < 10 ? '0' + day : day;

var dateString = year + '年' + month + '月' + day + '日';

var Mails = [{
  date: dateString,
  title: '水費',
  type: '信件',
  name: 'Amy',
}]

const List = () => {
  return Mails.map((item, index) => {
      return (
          <div key={index} className='history-header history-content'>
            <div className='history-component' style={{flexBasis: '35%'}}>
              <span>{item.date}</span>
            </div>
            <div className='history-component' style={{flexBasis: '20%'}}>
              <span>{item.title}</span>
            </div>
            <div className='history-component' style={{flexBasis: '15%'}}>
              <span>{item.type}</span>
            </div>
            <div className='history-component' style={{flexBasis: '15%'}}>
              <span>{item.name}</span>
            </div>
            <div className='history-component history-detail' style={{flexBasis: '15%'}}>
              <span>查看</span>
            </div>
          </div>
      )
  })
}

function History() {

  return (
    <>
      <h1>歷史紀錄</h1>
      <div className='history-header history-title'>
        <div className='history-component' style={{flexBasis: '35%'}}>
          <span>日期</span>
        </div>
        <div className='history-component' style={{flexBasis: '20%'}}>
          <span>郵件主題</span>
        </div>
        <div className='history-component' style={{flexBasis: '15%'}}>
          <span>類型</span>
        </div>
        <div className='history-component' style={{flexBasis: '15%'}}>
          <span>收信人</span>
        </div>
        <div className='history-component' style={{flexBasis: '15%'}}>
          <span>細節</span>
        </div>
      </div>
      <List />
    </>
  )
}

export default History
