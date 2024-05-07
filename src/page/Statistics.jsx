import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import Wrapper from "../components/layout/Wrapper";
import Box from "../components/ui/Box";
import Title from "../components/ui/Title";
import PropTypes from 'prop-types';

ChartJS.register(...registerables);

Chart.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any
}

function Chart({ title, children}){
  return (
    <Box
      mb={4}
      p={[2, 3, 4]}
      width={"100%"}
      maxWidth={"1000px"}
      flexDirection={"column"}
      bg={"secondary-background"}
      borderRadius={"20px"}
    >
      <Title
        my={2}
        fontSize={[2, 3, 4]}
        textAlign={"center"}
      >
        {title}
      </Title>
      {children}
    </Box>
  )
}

function Statistics() {

  const BarData ={
    labels: ["1月", "2月", "3月", "4月", "5月", "6月"],
    datasets: [
      {
        label: "數量",
        backgroundColor: "rgb(56, 182, 255)",
        hoverBackgroundColor: "rgb(0, 160, 253)",
        data: [9, 8, 8, 10, 5,9],
      },
  ]};

  const BarOptions = {
    scales: {
      x: {
        barPercentage : 0.5,
      },
    },
  };

  const PieData = {
    labels: [
      '公家單位',
      '一般信件',
      '廣告',
      '月刊'
    ],
    datasets: [{
      label: '數量',
      data: [24, 5, 14, 6],
      backgroundColor: [
        'rgb(0, 202, 220)',
        'rgb(255, 87, 87)',
        'rgb(255, 145, 77)',
        'rgb(126, 217, 87)'
      ],
      hoverOffset: 4
    }]
  };

  return (
    <>
      <Wrapper title="圖表統計">
        <Box
          flexDirection={"column"}
        >
          <Chart title="2023上半年收件數量">
            <Bar data={BarData} options={BarOptions}/>
          </Chart>
          <Chart title="2023上半年收件數量">
            <Pie data={PieData} options={""}/>
          </Chart>
        </Box>
      </Wrapper>
    </>
  );
}

export default Statistics;