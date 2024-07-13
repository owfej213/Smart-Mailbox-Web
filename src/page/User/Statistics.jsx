import { Chart, registerables } from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import { Center, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import Wrapper from "../../components/ui/Wrapper";
import SubTitle from "../../components/ui/SubTitle";
import Container from "../../components/ui/Container";
import { useMailsData } from "../../components/Context/MailsDataContext";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker, createStaticRanges } from "react-date-range";
import { useEffect, useState } from "react";
import {
  dateSelecter,
  monthsMailFilter,
  todaysMailFilter,
} from "../../utils/mailsFilters";
import { zhTW } from "date-fns/locale";
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
} from "date-fns";

const COLOR = [
  "rgba(255, 99, 132, 0.8)",
  "rgba(54, 162, 235, 0.8)",
  "rgba(75, 192, 192, 0.8)",
  "rgba(255, 206, 86, 0.8)",
  "rgba(255, 159, 64, 0.8)",
  "rgba(153, 102, 255, 0.8)",
  "rgba(255, 182, 193, 0.8)",
  "rgba(0, 255, 255, 0.8)",
];

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
    label: "今天",
    range: () => ({
      startDate: defineds.startOfToday,
      endDate: defineds.endOfToday,
    }),
  },
  {
    label: "本週",
    range: () => ({
      startDate: defineds.startOfWeek,
      endDate: defineds.endOfWeek,
    }),
  },
  {
    label: "本月",
    range: () => ({
      startDate: defineds.startOfMonth,
      endDate: defineds.endOfMonth,
    }),
  },
  {
    label: "今年",
    range: () => ({
      startDate: defineds.startOfYear,
      endDate: defineds.endOfYear,
    }),
  },
]);

const InputRanges = [
  {
    label: "截至今天的天數",
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
      if (!isSameDay(range.endDate, defineds.endOfToday)) return "-";
      if (!range.startDate) return "∞";
      return differenceInCalendarDays(defineds.endOfToday, range.startDate) + 1;
    },
  },
  {
    label: "從今天開始的天數",
    range(value) {
      const today = new Date();
      return {
        startDate: today,
        endDate: addDays(today, Math.max(Number(value), 1) - 1),
      };
    },
    getCurrentValue(range) {
      if (!isSameDay(range.startDate, defineds.startOfToday)) return "-";
      if (!range.endDate) return "∞";
      return differenceInCalendarDays(range.endDate, defineds.startOfToday) + 1;
    },
  },
];

Chart.register(...registerables);

function Statistics() {
  const { mailsDataCount, mailsData } = useMailsData();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const [classes, setClasses] = useState({});
  const [timeClasses, setTimeClasses] = useState({});
  const [dateArray, setDateArray] = useState([]);
  const [todaysMailCounts, setTodaysMailCounts] = useState(Number);
  const [monthsMailCounts, setMonthsMailCounts] = useState(Number);
  const [dateRange, setDateRange] = useState({});
  const PieData = {
    labels: Object.keys(classes),
    datasets: [
      {
        label: "數量",
        data: Object.values(classes),
        backgroundColor: COLOR,
        borderWidth: 1,
        hoverOffset: 50,
      },
    ],
  };

  const LineData = {
    labels: dateArray,
    datasets: Object.keys(timeClasses).map((item, index) => {
      return {
        label: item,
        data: timeClasses[item],
        backgroundColor: COLOR[index % COLOR.length],
        borderWidth: 5,
        borderColor: COLOR[index % COLOR.length],
        tension: 0.5,
      };
    }),
  };

  const BarOptions = {
    scales: {
      x: {
        barPercentage: 0.5,
      },
    },
  };

  useEffect(() => {
    let todaysMails = todaysMailFilter(mailsData);
    setTodaysMailCounts(todaysMails.length);

    let monthsMails = monthsMailFilter(mailsData);
    setMonthsMailCounts(monthsMails.length);
    const { mailClasses, mailtimeClasses, formattedDates } = dateSelecter(
      mailsData,
      dateRange.startDate,
      dateRange.endDate
    );
    setClasses(mailClasses);
    setTimeClasses(mailtimeClasses);
    setDateArray(formattedDates);
  }, [dateRange, mailsData]);

  function handleSelect(ranges) {
    setDateRange(ranges.selection);
    setState([ranges.selection]);
  }

  return (
    <>
      <Wrapper>
        <Grid
          h="400px"
          maxW="1200px"
          w="100%"
          templateColumns="repeat(8, 1fr)"
          gap={4}
        >
          <GridItem colSpan={8}>
            <Container h="100%">
              <SubTitle>總覽</SubTitle>
              <Stack spacing="8" direction={["column", "column", "row"]}>
                <Container bg="gray.500">
                  <SubTitle size="lg">郵件總數</SubTitle>
                  <Center>
                    <Text color="white" fontSize="3xl">
                      {mailsDataCount}
                    </Text>
                  </Center>
                </Container>
                <Container bg="gray.500">
                  <SubTitle size="lg">今日郵件數</SubTitle>
                  <Center>
                    <Text color="white" fontSize="3xl">
                      {todaysMailCounts}
                    </Text>
                  </Center>
                </Container>
                <Container bg="gray.500">
                  <SubTitle size="lg">本月郵件數</SubTitle>
                  <Center>
                    <Text color="white" fontSize="3xl">
                      {monthsMailCounts}
                    </Text>
                  </Center>
                </Container>
              </Stack>
            </Container>
          </GridItem>
          <GridItem colSpan={[8, 8, 4]}>
            <Container h="100%">
              <SubTitle size="3xl">郵件總類</SubTitle>
              <Center w="100%" h="400px">
                <Pie data={PieData} options={""} />
              </Center>
            </Container>
          </GridItem>
          <GridItem colSpan={[8, 8, 4]}>
            <Container h="100%">
              <SubTitle size="3xl" pb="0">
                收件日期範圍選擇
              </SubTitle>
              <Center h="100%">
                <DateRangePicker
                  locale={zhTW}
                  editableDateInputs={true}
                  onChange={handleSelect}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                  dateDisplayFormat="yyyy-MM-dd"
                  staticRanges={StaticRanges}
                  inputRanges={InputRanges}
                />{" "}
              </Center>
            </Container>
          </GridItem>
          <GridItem colSpan={[8, 8, 8]}>
            <Container h="100%">
              <SubTitle size="3xl" pb="0">
                收件日期
              </SubTitle>
              <Center w="100%" h="600px">
                <Line data={LineData} options={BarOptions} />
              </Center>
            </Container>
          </GridItem>
        </Grid>
      </Wrapper>
    </>
  );
}

export default Statistics;
