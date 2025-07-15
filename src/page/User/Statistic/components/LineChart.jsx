import { Line } from 'react-chartjs-2';
import { COLOR } from '../../../../utils/chartColors';
import PropTypes from 'prop-types';

export function LineChart({ timeClasses, dateArray }) {
  const LineData = {
    labels: dateArray,
    datasets: Object.keys(timeClasses).map((item, index) => {
      return {
        label: item,
        data: timeClasses[item],
        backgroundColor: COLOR[index % COLOR.length],
        borderWidth: 2,
        borderColor: COLOR[index % COLOR.length],
      };
    }),
  };
  return (
    <>
      <Line data={LineData} />
    </>
  );
}

LineChart.propTypes = {
  timeClasses: PropTypes.object.isRequired,
  dateArray: PropTypes.arrayOf(PropTypes.string).isRequired,
};
