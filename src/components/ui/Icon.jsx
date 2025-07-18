import { icons } from 'lucide-react';
import PropTypes from 'prop-types';

export default function Icon({ name, color = 'white', size = 24 }) {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} />;
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};
