import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const variants = {
  auth: definePartsStyle({
    container: {
      borderColor: "white",
      borderWidth: "2px",
      background: "gray.600",
      maxW: "400px",
      width: "100%",
    },
    header: {
      color: "white",
      textAlign: "center",
      fontSize: "3xl",
      fontWeight: "bold",
      pt: "8",
    },
    body: {
      color: "white",
      label: {
        fontSize: "lg",
        fontWeight: "900",
      },
      input: {
        bg: "white",
        color: "black",
      },
    },
    footer: {
      hr: {
        h: "2px",
        flex: "1 1",
      },
      p: {
        color: "white",
      },
    },
  }),
  test: definePartsStyle({
    container: {
      borderColor: "white",
      borderWidth: "2px",
      background: "gray.600",
      maxW: "800px",
      width: "100%",
    },
    header: {
      color: "white",
      textAlign: "center",
      fontSize: "3xl",
      fontWeight: "bold",
      pt: "8",
    },
    body: {
      color: "white",
      label: {
        fontSize: "lg",
        fontWeight: "900",
      },
      input: {
        bg: "white",
        color: "black",
      },
    },
  }),
  setting: definePartsStyle({
    container: {
      color: "gray.800",
      background: "transparent",
      width: "100%",
    },
    body: {
      label: {
        fontSize: "xl",
        fontWeight: "900",
      },
      input: {
        bg: "gray.200",
        color: "black",
      },
    },
  }),
};

export const cardTheme = defineMultiStyleConfig({ variants });
