import { ThemeProvider } from '@emotion/react';
import GlobalStyles from './styles/GlobalStyles.jsx';
import theme from './styles/Theme.jsx';
import Header from './components/Header';
import { AuthProvider } from './components/Context/AuthContext.jsx';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Login from './page/Login.jsx';
import Home from './page/Home.jsx';
import History from './page/History.jsx';
import Statistics from './page/Statistics.jsx';
import Inside_Box from './page/Inside-Box.jsx';
import Admin from './page/Admin.jsx';
import Register from './page/Register.jsx';
import Storage from './page/Storage.jsx';
import Detail from './page/Detail.jsx';
import Setting from './page/Setting.jsx';
function App() {

  return (
  <>
    <HashRouter>
      <AuthProvider>
        <ThemeProvider theme={ theme }>
          <GlobalStyles />
            <Routes>
              <Route element={<Header />} >
                <Route path="/" element={<Home />} />
                <Route path="/home">
                  <Route index element={<Home />} />
                  <Route path="history">
                    <Route index element={<History />} />
                    <Route path=":id" element={<Detail />} />
                  </Route>
                  <Route path="statistics" element={<Statistics />} />
                  <Route path="inside-Box" element={<Inside_Box />} />
                  <Route path="admin" element={<Admin />} />
                  <Route path="storage" element={<Storage />} />
                  <Route path="setting" element={<Setting />} />
                </Route>
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
        </ThemeProvider>
      </AuthProvider>
    </HashRouter>
  </>
  )
}

export default App;
