import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles.jsx';
import theme from './styles/Theme.jsx';
import Header from './components/Header';

function App() {

  return (
  <>
    <ThemeProvider theme={ theme }>
      <GlobalStyles />
      <Header />
    </ThemeProvider>
  </>
  )
}

export default App;
