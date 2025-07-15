import { useEffect, useState } from 'react';
import { dateSelecter } from '../../../../utils/mailsFilters';
import { useMailsDataContext } from '../../../../hooks/useMailsDataContext';

export function useGetMailsData() {
  const { mailsData } = useMailsDataContext();
  const [dateRange, setDateRange] = useState({});
  const [classes, setClasses] = useState({});
  const [timeClasses, setTimeClasses] = useState({});
  const [dateArray, setDateArray] = useState([]);

  useEffect(() => {
    const { mailClasses, mailtimeClasses, formattedDates } = dateSelecter(
      mailsData,
      dateRange.startDate,
      dateRange.endDate
    );
    setClasses(mailClasses);
    setTimeClasses(mailtimeClasses);
    setDateArray(formattedDates);
  }, [dateRange, mailsData]);

  return {
    classes,
    timeClasses,
    dateArray,
    dateRange,
    setDateRange,
  };
}
