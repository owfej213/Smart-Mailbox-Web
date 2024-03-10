import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import "../css/Statistics.css"

ChartJS.register(...registerables);

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
      <h1>圖表統計</h1>
      <div className="Total-chart">
        <div className="chart">
          <h2>20XX上半年收件數量</h2>
          <Bar className="detail" data={BarData} options={BarOptions}/>
        </div>
        <div className="chart">
        <h2>20XX上半年收件類型</h2>
          <Pie className="detail" data={PieData} options={""}/>
        </div>
      </div>
    </>
  );
}

export default Statistics;