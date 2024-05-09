import theme from './styles/Theme.jsx';
import Header from './components/layout/Header';
import { AuthProvider } from './components/Context/AuthContext.jsx';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Login from './page/Auth/Login.jsx';
import Home from './page/Home.jsx';
import History from './page/User/History.jsx';
import Statistics from './page/User/Statistics.jsx';
import Inside_Box from './page/User/Inside-Box.jsx';
import Admin from './page/Admin.jsx';
import Register from './page/Auth/Register.jsx';
import Storage from './page/Storage.jsx';
import Detail from './page/User/Detail.jsx';
import Setting from './page/Setting.jsx';
import UserOptions from './page/Auth/UserOptions.jsx';
import UserTypes from './page/Auth/UserTypes.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { UserDataProvider } from './components/Context/UserDataContext.jsx';
import { MailsDataProvider } from './components/Context/MailsDataContext.jsx';

function App() {

  return (
  <>
    <HashRouter>
      <AuthProvider>
        <UserDataProvider>
          <MailsDataProvider>
            <ChakraProvider theme={theme}>
                <Routes>
                  <Route element={<Header />} >
                    <Route path="/" element={<Home />} />
                    <Route path="home">
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
                  <Route path="/register" >
                    <Route index element={<Register />} />
                    <Route path="user-options" element={<UserOptions />} />
                    <Route path="user-types" element={<UserTypes />} />
                  </Route>
                </Routes>
            </ChakraProvider>
          </MailsDataProvider>
        </UserDataProvider>
      </AuthProvider>
    </HashRouter>
  </>
  )
}

export default App;
