import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import {
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
} from "@chakra-ui/react";
import Wrapper from "../../components/ui/Wrapper";
import SubTitle from "../../components/ui/SubTitle";
import Container from "../../components/ui/Container";
import { useMailsData } from "../../components/Context/MailsDataContext";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker, createStaticRanges } from "react-date-range";
import { useEffect, useState } from "react";
import { monthsMailFilter, todaysMailFilter } from "../../utils/mailsFilters";
import { zhTW } from "date-fns/locale";
import Icon from "../../components/ui/Icon";
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

ChartJS.register(...registerables);

function Statistics() {
  const { mailsDataCount, mailsData, mailClasses } = useMailsData();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const [todaysMailCounts, setTodaysMailCounts] = useState(Number);
  const [monthsMailCounts, setMonthsMailCounts] = useState(Number);
  const PieData = {
    labels: Object.keys(mailClasses),
    datasets: [
      {
        label: "數量",
        data: Object.values(mailClasses),
        backgroundColor: [
          "rgb(0, 202, 220)",
          "rgb(255, 87, 87)",
          "rgb(255, 145, 77)",
          "rgb(126, 217, 87)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const BarData = {
    labels: ["1月", "2月", "3月", "4月", "5月"],
    datasets: [
      {
        label: "數量",
        backgroundColor: "rgb(56, 182, 255)",
        hoverBackgroundColor: "rgb(0, 160, 253)",
        borderRadius: 5,
        barPercentage: 0.5,
        data: [9, 8, 8, 10, 6],
      },
    ],
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
  }, [mailsData]);
  console.log(mailClasses);
  function handleSelect(ranges) {
    console.log(ranges.selection.startDate);
    console.log(ranges.selection.endDate);
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
          <GridItem colSpan={[8, 8, 8]}>
            <Container h="100%">
              <SubTitle>總攬</SubTitle>
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
              <Flex justify="center">
                <SubTitle size="3xl" pb="0">
                  收件日期範圍選擇
                </SubTitle>
                <Popover h="100%">
                  <PopoverTrigger>
                    <Button fontSize="2xl" p="2" ml="2">
                      <Icon name="CalendarPlus2" color="gray" size={30} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent w="600px">
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader textAlign="center" fontWeight="bold">
                      請選擇日期範圍
                    </PopoverHeader>
                    <PopoverBody>
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
                    </PopoverBody>
                  </PopoverContent>
                </Popover>{" "}
              </Flex>
              <Center w="100%" h="400px">
                <Bar data={BarData} options={BarOptions} />
              </Center>
            </Container>
          </GridItem>
        </Grid>
      </Wrapper>
    </>
  );
}

export default Statistics;
