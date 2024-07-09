import { startOfDay, endOfDay, startOfMonth, endOfMonth } from 'date-fns';
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

    const todaysMails = mails.filter(mail => mail?.createAt?.seconds >= startOfMonthTimestamp && mail?.createAt?.seconds <= endOfMonthTimestamp);
    return todaysMails;
}