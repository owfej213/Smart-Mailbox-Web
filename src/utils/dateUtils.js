//輸入時間戳 回傳年月日
export function formateDateYMD(Time){
    if(!Time) return;
    var date = new Date(Time * 1000);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
  
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
  
    var dateString = `${year}年${month}月${day}日`;
    return dateString;
}
//輸入時間戳 回傳年月日時分
export function formateDateYMDHM(Time){
    if(!Time) return;
    var date = new Date(Time * 1000);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var Minute = date.getMinutes();
  
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hour = hour < 10 ? "0" + hour : hour;
    Minute = Minute < 10 ? "0" + Minute : Minute;
  
    var dateString = `${year}年${month}月${day}日${hour}時${Minute}分`;
    return dateString;
}
//輸入時間戳 回傳時間差
export function TimeBetween(start, end){
    var difference = Math.abs(end - start);
    var daysDifference = Math.floor(difference / (60 * 60 * 24));
    var hoursDifference = Math.floor((difference % (60 * 60 * 24)) / (60 * 60));
    var minutesDifference = Math.floor((difference % (60 * 60)) / 60);
  
    if (daysDifference > 0) {
      return daysDifference + "天前";
    } else if (hoursDifference > 0) {
      return hoursDifference + "小時前";
    } else {
      return minutesDifference + "分鐘前";
    }
}