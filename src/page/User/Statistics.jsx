import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { Box, VStack } from "@chakra-ui/react";
import MainTitle from "../../components/ui/MainTitle";
import Wrapper from "../../components/ui/Wrapper";
import SubTitle from "../../components/ui/SubTitle";
import PropTypes from "prop-types";
import Container from "../../components/ui/Container";

ChartJS.register(...registerables);

function Chart({ title, children }) {
  return (
    <Box p="4">
      <SubTitle size="lg">{title}</SubTitle>
      <Box p="8">{children}</Box>
    </Box>
  );
}

Chart.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
};

function Statistics() {
  const BarData = {
    labels: ["1月", "2月", "3月", "4月", "5月", "6月"],
    datasets: [
      {
        label: "數量",
        backgroundColor: "rgb(56, 182, 255)",
        hoverBackgroundColor: "rgb(0, 160, 253)",
        data: [9, 8, 8, 10, 5, 9],
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

  return (
    <>
      <MainTitle>主頁</MainTitle>
      <Wrapper>
        <VStack maxW="1000px" w="100%" spacing="10">
          <Container>
            <Chart title="2023上半年收件數量">
              <Bar data={BarData} options={BarOptions} />
            </Chart>
          </Container>
          <Container>
            <Chart title="2023上半年收件數量">
              <Pie data={PieData} options={""} />
            </Chart>
          </Container>
        </VStack>
      </Wrapper>
    </>
  );
}

export default Statistics;
