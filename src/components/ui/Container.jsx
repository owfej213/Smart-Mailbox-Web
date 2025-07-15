import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function Container({ children, ...props }) {
  return (
    <Box m="auto" maxW="container" px={['4', '6', '8']} {...props}>
      {children}
    </Box>
  );
}

Container.propTypes = {
  children: PropTypes.any,
};
