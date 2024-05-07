import { icons } from 'lucide-react';
import PropTypes from 'prop-types';

const Icon = ({ name, color, size }) => {
  const LucideIcon = icons[name];
  
  return <LucideIcon color={color} size={size} />;
};

Icon.propTypes= {
    name: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number
}

export default Icon;