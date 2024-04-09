import styled from "styled-components";
import { color, space, typography, layout, flexbox, border } from "styled-system";
import { Button } from "react-aria-components";

export const Box = styled.div`
  ${color}
  ${space}
  ${layout}
  ${border}
  ${typography}
  ${flexbox}
  display: flex;
`

export const Title = styled.h1`
    margin: 0.5em 0;
    color: white;
    text-align: center;
    font-size: 3em;
`;

export const Container = styled.div`
    width: 1000px;
    max-width: 100%;
    padding-top: 20px;
    margin: 0 auto;
`;

export const HandleAccountContainer = styled(Container)`
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  img {
    width: 256px;
    height: 256px;
  }
  p {
    color: rgb(217, 217, 217);
    margin: 1em 0;
    text-align: center;
  }
  p a {
    color: white;
    font-weight: bold;
    text-decoration: none;
    &:hover{
      color: rgb(56, 182, 255);
    }
  }
`;

export const HandleAccountCard = styled.div`
  margin-left: 10em;
  padding: 2em 0;
  width: 100%;
  max-width: 400px;
  border: 2px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    width: 100%;
    max-width: 350px;
  }

  input[type="email"],
  input[type="text"],
  input[type="password"] {
    width: 100%;
    margin-top: 1em;
    margin-bottom: 1em;
    padding: 0.8em;
    box-sizing: border-box;
    border: 0;
    border-radius: 5px;
  }

  h2 {
    font-size: 2em;
    text-align: center;
  }

  label {
    display: flex;
    font-size: 1.2em;
    font-weight: bold;
  }
`;

export const HandleAccountErrorMessage = styled.span`
    text-align: center;
    color: rgb(241, 94, 108);
`;

export const StyledButton = styled(Button)`
    ${color}
    ${space}
    ${layout}
    ${border}
    
    border: 0;
    color: black;
    font-weight: bolder;

    &:hover{
        cursor: pointer;
        filter: brightness(0.8);
    }
`;

export const CaptionTextBox = styled.div`
display: flex;
margin: 20px 20px;

p {
  color: white;
  margin: 0 4px;
}

hr {
  height: 1px;
  flex:1 1;
}
`;