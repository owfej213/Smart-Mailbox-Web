import { Stack } from "@chakra-ui/react";
import PropTypes from "prop-types";

function Wrapper({ children }) {
  return (
    <Stack
      mx={["4", "8"]}
      pt="12"
      spacing="8"
      justify="center"
      align="flex-start"
      direction={["column", "column", "row"]}
    >
      {children}
    </Stack>
  );
}

Wrapper.propTypes = {
  children: PropTypes.any,
};

export default Wrapper;
