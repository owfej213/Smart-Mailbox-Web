import {
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  differenceInDays,
  getTime,
  startOfYear,
  endOfYear,
} from 'date-fns';
export function todaysMailFilter(mails) {
  const today = new Date();
  const startOfDayTimestamp = startOfDay(today).getTime() / 1000;
  const endOfDayTimestamp = endOfDay(today).getTime() / 1000;

  const todaysMails = mails.filter(
    (mail) =>
      mail?.createAt >= startOfDayTimestamp &&
      mail?.createAt <= endOfDayTimestamp
  );
  return { todaysMails, todaysMailsCount: todaysMails.length };
}

export function monthsMailFilter(mails) {
  const today = new Date();
  const startOfMonthTimestamp = startOfMonth(today).getTime() / 1000;
  const endOfMonthTimestamp = endOfMonth(today).getTime() / 1000;

  const thisMonthsMails = mails.filter(
    (mail) =>
      mail?.createAt >= startOfMonthTimestamp &&
      mail?.createAt <= endOfMonthTimestamp
  );
  return { thisMonthsMails, thisMonthsMailsCount: thisMonthsMails.length };
}

export function yearsMailFilter(mails) {
  const today = new Date();
  const startOfYearTimestamp = startOfYear(today).getTime() / 1000;
  const endOfYearTimestamp = endOfYear(today).getTime() / 1000;

  const thisYearsMails = mails.filter(
    (mail) =>
      mail?.createAt >= startOfYearTimestamp &&
      mail?.createAt <= endOfYearTimestamp
  );
  return { thisYearsMails, thisYearsMailsCount: thisYearsMails.length };
}

export function dateSelecter(mails, startDate, endDate) {
  var mailClasses = {};
  var mailtimeClasses = {};

  if (!startDate && !endDate) {
    startDate = Infinity;
    endDate = 0;
    mails.forEach((mail) => {
      if (mail?.createAt * 1000 < startDate) {
        startDate = mail?.createAt * 1000;
      }
      if (mail?.createAt * 1000 > endDate) {
        endDate = mail?.createAt * 1000;
      }
    });
  }
  const startDateTimestamp = getTime(startDate) / 1000;
  const endDateTimestamp = getTime(endDate) / 1000;
  //過濾時間範圍內的信件
  const selecteDateMails = mails.filter(
    (mail) =>
      mail?.createAt >= startDateTimestamp && mail?.createAt <= endDateTimestamp
  );
  //時間範圍的日期陣列
  const datesInRange = eachDayOfInterval({ start: startDate, end: endDate });
  const formattedDates = datesInRange.map((date) => format(date, 'yyyy/MM/dd'));

  const mailDefaultClasses = {
    金融: '金融信封',
    學校: '學校信封',
    費用: '費用信封',
    私人: '私人信封',
    公文: '公文信封',
    活動: '活動傳單',
    廣告: '廣告傳單',
    書刊: '書刊',
  };

  selecteDateMails.forEach((mail) => {
    if (mail?.type !== undefined && mail?.type !== '') {
      let mailType = '其他';

      for (var mailclass in mailDefaultClasses) {
        if (mail.type.includes(mailclass)) {
          mailType = mailDefaultClasses[mailclass];
          break;
        }
      }

      if (mailClasses[mailType]) {
        mailClasses[mailType] += 1;
      } else {
        mailClasses[mailType] = 1;
      }

      if (!mailtimeClasses[mailType]) {
        mailtimeClasses[mailType] = [];
        for (var i = 0; i < formattedDates.length; i++) {
          mailtimeClasses[mailType].push(0);
        }
      }
      const daysDiff = differenceInDays(
        new Date(mail?.createAt * 1000),
        startDate
      );

      mailtimeClasses[mailType][daysDiff] += 1;
    }
  });
  return {
    mailClasses,
    mailtimeClasses,
    formattedDates,
  };
}
