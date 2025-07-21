import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout.jsx';
import Login from './page/Auth/Login.jsx';
import Home from './page/Home.jsx';
import History from './page/User/History';
import Detail from './page/User/Detail';
import Analyze from './page/User/Analyze';
import Statistics from './page/User/Statistic';
import InsideBox from './page/User/InsideBox';
import Register from './page/Auth/Register.jsx';
import Setting from './page/Auth/UserSetting.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import { AuthProvider } from './components/context/AuthProvider.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { system } from './theme';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ChakraProvider value={system}>
          <Routes>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route element={<MainLayout />}>
                <Route exact path="/" element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="history" element={<History />} />
                <Route path="detail/:id" element={<Detail />} />
                <Route path="statistics" element={<Statistics />} />
                <Route path="analyze" element={<Analyze />} />
                <Route path="inside_Box" element={<InsideBox />} />
                <Route path="setting" element={<Setting />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </ChakraProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
