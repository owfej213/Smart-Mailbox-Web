import styled from "@emotion/styled";
import { color, space, layout, border, typography, variant } from "styled-system";

const buttonVariants = variant({
    variants: {
      primary: {
        border: 0,
        fontWeight: "bolder",
    
        "&:hover": {
            cursor: "pointer",
            filter: "brightness(0.9)",
        }
      },
    },
});

const Button = styled.button`
    ${color}
    ${space}
    ${layout}
    ${border}
    ${typography}
    ${buttonVariants}
`

Button.defaultProps = {
    color: "black"
}

export default Button;