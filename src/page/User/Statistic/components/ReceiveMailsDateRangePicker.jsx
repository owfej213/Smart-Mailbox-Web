import {
  addDays,
  addMonths,
  differenceInCalendarDays,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  isSameDay,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns';
import { DateRangePicker, createStaticRanges } from 'react-date-range';
import { zhTW } from 'date-fns/locale';
import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const defineds = {
  startOfWeek: startOfWeek(new Date()),
  endOfWeek: endOfWeek(new Date()),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
  startOfToday: startOfDay(new Date()),
  endOfToday: endOfDay(new Date()),
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
  startOfYear: startOfYear(new Date()),
  endOfYear: endOfYear(new Date()),
};

const StaticRanges = createStaticRanges([
  {
    label: '重置',
    range: () => ({
      startDate: undefined,
      endDate: undefined,
    }),
  },
  {
    label: '今天',
    range: () => ({
      startDate: defineds.startOfToday,
      endDate: defineds.endOfToday,
    }),
  },
  {
    label: '本週',
    range: () => ({
      startDate: defineds.startOfWeek,
      endDate: defineds.endOfWeek,
    }),
  },
  {
    label: '本月',
    range: () => ({
      startDate: defineds.startOfMonth,
      endDate: defineds.endOfMonth,
    }),
  },
  {
    label: '今年',
    range: () => ({
      startDate: defineds.startOfYear,
      endDate: defineds.endOfYear,
    }),
  },
]);

const InputRanges = [
  {
    label: '截至今天的天數',
    range(value) {
      return {
        startDate: addDays(
          defineds.startOfToday,
          (Math.max(Number(value), 1) - 1) * -1
        ),
        endDate: defineds.endOfToday,
      };
    },
    getCurrentValue(range) {
      if (!isSameDay(range.endDate, defineds.endOfToday)) return '-';
      if (!range.startDate) return '∞';
      return differenceInCalendarDays(defineds.endOfToday, range.startDate) + 1;
    },
  },
  {
    label: '從今天開始的天數',
    range(value) {
      const today = new Date();
      return {
        startDate: today,
        endDate: addDays(today, Math.max(Number(value), 1) - 1),
      };
    },
    getCurrentValue(range) {
      if (!isSameDay(range.startDate, defineds.startOfToday)) return '-';
      if (!range.endDate) return '∞';
      return differenceInCalendarDays(range.endDate, defineds.startOfToday) + 1;
    },
  },
];

export function ReceiveMailsDateRangePicker({ setDateRange }) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);
  function handleSelect(ranges) {
    setDateRange(ranges.selection);
    setState([ranges.selection]);
  }

  return (
    <>
      <Box color="black" asChild>
        <DateRangePicker
          locale={zhTW}
          editableDateInputs={true}
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          ranges={state}
          dateDisplayFormat="yyyy-MM-dd"
          staticRanges={StaticRanges}
          inputRanges={InputRanges}
        />
      </Box>
    </>
  );
}

ReceiveMailsDateRangePicker.propTypes = {
  setDateRange: PropTypes.func.isRequired,
};
