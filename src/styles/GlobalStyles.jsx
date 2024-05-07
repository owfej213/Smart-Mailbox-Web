import { Global, css, useTheme } from '@emotion/react'
function GlobalStyles(){
    const theme = useTheme()
    return (
        <>
            <Global styles={
                css`
                    body{
                        margin: 0;
                        background-color: ${theme.colors['primary-background']};
                    }

                    * {
                        font-family: "Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif;
                        box-sizing: border-box;
                    }

                    img {
                        max-width: 100%;
                    }
                `
            }/>
        </>
    )
}

export default GlobalStyles;