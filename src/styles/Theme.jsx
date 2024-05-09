import { extendTheme } from "@chakra-ui/react";
import { cardTheme } from "./CardVariants";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        margin: 0,
        backgroundColor: "gray.600",
      },
      "*": {
        fontFamily:
          '"Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif',
        boxSizing: "border-box",
      },
      img: {
        maxWidth: "100%",
      },
    },
  },
  components: {
    Card: cardTheme,
  },
});

export default theme;
