import { startOfDay, endOfDay, startOfMonth, endOfMonth, eachDayOfInterval, format, differenceInDays, getTime } from 'date-fns';
export function todaysMailFilter(mails){
    const today = new Date();
    const startOfDayTimestamp = startOfDay(today).getTime() / 1000;
    const endOfDayTimestamp = endOfDay(today).getTime() / 1000;

    const todaysMails = mails.filter(mail => mail?.createAt?.seconds >= startOfDayTimestamp && mail?.createAt?.seconds <= endOfDayTimestamp);
    return todaysMails;
}

export function monthsMailFilter(mails){
    const today = new Date();
    const startOfMonthTimestamp = startOfMonth(today).getTime() / 1000;
    const endOfMonthTimestamp = endOfMonth(today).getTime() / 1000;

    const thisMonthsMails = mails.filter(mail => mail?.createAt?.seconds >= startOfMonthTimestamp && mail?.createAt?.seconds <= endOfMonthTimestamp);
    return thisMonthsMails;
}

export function dateSelecter(mails, startDate, endDate){
    var mailClasses = {};
    var mailtimeClasses = {};

    if(!startDate && !endDate){
        startDate = Infinity;
        endDate = 0;
        mails.forEach((mail) => {
            if(mail?.createAt?.seconds * 1000 < startDate){
                startDate = mail?.createAt?.seconds * 1000;
            }
            if(mail?.createAt?.seconds * 1000 > endDate){
                endDate = mail?.createAt?.seconds * 1000;
            }
        })
    }
    const startDateTimestamp = getTime(startDate) / 1000;
    const endDateTimestamp = getTime(endDate) / 1000;
    //過濾時間範圍內的信件
    const selecteDateMails = mails.filter(mail => mail?.createAt?.seconds >= startDateTimestamp && mail?.createAt?.seconds <= endDateTimestamp);
    //時間範圍的日期陣列
    const datesInRange = eachDayOfInterval({ start: startDate, end: endDate });
    const formattedDates = datesInRange.map(date => format(date, 'yyyy/MM/dd'));
    
    selecteDateMails.forEach(mail => {
        if (mail?.type !== undefined && mail?.type !== "") {
            if(mailClasses[mail?.type]){
                mailClasses[mail?.type] += 1;
            } else {
                mailClasses[mail?.type] = 1;
            }

            if(!mailtimeClasses[mail?.type]){
                mailtimeClasses[mail?.type] = [];
                for(var i = 0; i < formattedDates.length; i++){
                    mailtimeClasses[mail?.type].push(0);
                }
            }
            const daysDiff = differenceInDays(new Date(mail?.createAt?.seconds * 1000), startDate);

            mailtimeClasses[mail?.type][daysDiff] += 1;
        }
    });
    return {
        mailClasses,
        mailtimeClasses,
        formattedDates,
    };
}