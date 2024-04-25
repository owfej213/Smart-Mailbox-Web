import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import styled from "@emotion/styled";
import { Title, Wrapper } from '../components/CommonStyles';

ChartJS.register(...registerables);

const AllChart = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Chart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  background-color: rgb(217, 217, 217);
  border-radius: 20px;
  width: 75%;
`

const Subtitle = styled.h2`
  text-align: center;
  text-decoration: solid;
  font-size: 2em;
`

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
      <Wrapper>
        <Title fontSize={[3, 4, 5, 6]}>圖表統計</Title>
        <AllChart>
          <Chart>
            <Subtitle>20XX上半年收件數量</Subtitle>
            <Bar data={BarData} options={BarOptions}/>
          </Chart>
          <Chart>
            <Subtitle>20XX上半年收件類型</Subtitle>
            <Pie data={PieData} options={""}/>
          </Chart>
        </AllChart>
      </Wrapper>
    </>
  );
}

export default Statistics;