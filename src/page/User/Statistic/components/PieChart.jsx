import { Pie } from 'react-chartjs-2';
import { COLOR } from '../../../../utils/chartColors';
import PropTypes from 'prop-types';

export function PieChart({ classes }) {
  const PieData = {
    labels: Object.keys(classes),
    datasets: [
      {
        label: '數量',
        data: Object.values(classes),
        backgroundColor: COLOR,
        borderWidth: 1,
        hoverOffset: 50,
      },
    ],
  };
  return (
    <>
      <Pie data={PieData} options={''} />
    </>
  );
}

PieChart.propTypes = {
  classes: PropTypes.object.isRequired,
};
