import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body{
        margin: 0;
        background-color: rgb(84, 84, 84);
    }

    * {
        font-family: "Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif;
        box-sizing: border-box;
    }

    img {
        max-width: 100%;
    }
`;

export default GlobalStyles;