import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import {
  Center,
  Grid,
  GridItem,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import Wrapper from "../../components/ui/Wrapper";
import SubTitle from "../../components/ui/SubTitle";
import PropTypes from "prop-types";
import Container from "../../components/ui/Container";
import { useState } from "react";
import { useMailsData } from "../../components/Context/MailsDataContext";

ChartJS.register(...registerables);

function Chart({ title, children }) {
  return (
    <VStack p="4" h="100%">
      <SubTitle size="3xl">{title}</SubTitle>
      <Center w="100%" h="400px">
        {children}
      </Center>
    </VStack>
  );
}

Chart.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
};

const BarData = {
  labels: ["1月", "2月", "3月", "4月", "5月"],
  datasets: [
    {
      label: "數量",
      backgroundColor: "rgb(56, 182, 255)",
      hoverBackgroundColor: "rgb(0, 160, 253)",
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

const PieData = {
  labels: ["公家單位", "一般信件", "廣告", "月刊"],
  datasets: [
    {
      label: "數量",
      data: [24, 5, 14, 6],
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

function Statistics() {
  const { mailsDataCount } = useMailsData();
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  console.log(selectedDate);
  return (
    <>
      <Wrapper>
        <Grid
          h="400px"
          maxW="1200px"
          w="100%"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(8, 1fr)"
          gap={4}
        >
          <GridItem colSpan={5}>
            <Container h="100%">
              <SubTitle>總覽</SubTitle>
              <HStack spacing="8">
                <Container bg="gray.500">
                  <SubTitle size="md">郵件總數</SubTitle>
                  <Center>
                    <Text color="white" fontSize="3xl">
                      {mailsDataCount}
                    </Text>
                  </Center>
                </Container>
                <Container bg="gray.500">
                  <SubTitle size="md">今日郵件數</SubTitle>
                  <Center>
                    <Text color="white" fontSize="3xl">
                      0
                    </Text>
                  </Center>
                </Container>
                <Container bg="gray.500">
                  <SubTitle size="md">每月平均信件數</SubTitle>
                  <Center>
                    <Text color="white" fontSize="3xl">
                      6
                    </Text>
                  </Center>
                </Container>
              </HStack>
            </Container>
          </GridItem>
          <GridItem colSpan={3}>
            <Container h="100%">
              <SubTitle>收件日期範圍選擇</SubTitle>
              <Input
                my="auto"
                bg="white"
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
                onChange={handleDateChange}
              />
            </Container>
          </GridItem>
          <GridItem colSpan={4}>
            <Container h="100%">
              <Chart title="郵件數量">
                <Bar data={BarData} options={BarOptions} />
              </Chart>
            </Container>
          </GridItem>
          <GridItem colSpan={4}>
            <Container h="100%">
              <Chart title="郵件總類">
                <Pie data={PieData} options={""} />
              </Chart>
            </Container>
          </GridItem>
        </Grid>
      </Wrapper>
    </>
  );
}

export default Statistics;
