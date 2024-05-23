import theme from "./styles/Theme.jsx";
import Header from "./components/layout/Header";
import { AuthProvider } from "./components/Context/AuthContext.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./page/Auth/Login.jsx";
import Home from "./page/Home.jsx";
import History from "./page/User/History.jsx";
import Statistics from "./page/User/Statistics.jsx";
import InsideBox from "./page/User/Inside-Box.jsx";
import Admin from "./page/Admin/Admin.jsx";
import Register from "./page/Auth/Register.jsx";
import Storage from "./page/Root/SendImage.jsx";
import Detail from "./page/User/Detail.jsx";
import Setting from "./page/Auth/UserSetting.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { UserDataProvider } from "./components/Context/UserDataContext.jsx";
import { MailsDataProvider } from "./components/Context/MailsDataContext.jsx";
import SendMail from "./page/Root/SendMail.jsx";
import RoleBasedRoute from "./Routes/RoleBasedRoute.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import SendImage from "./page/Root/SendImage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <UserDataProvider>
            <MailsDataProvider>
              <ChakraProvider theme={theme}>
                <Routes>
                  {/* 確認登入狀態 */}
                  <Route exact path="/" element={<PrivateRoute />}>
                    <Route element={<Header />}>
                      <Route exact path="/" element={<Home />} />
                      <Route path="home" element={<Home />} />
                      <Route path="history" element={<History />} />
                      <Route path="detail/:id" element={<Detail />} />
                      <Route path="statistics" element={<Statistics />} />
                      <Route path="inside-Box" element={<InsideBox />} />
                      <Route path="storage" element={<Storage />} />
                      <Route path="setting" element={<Setting />} />
                      {/* 確認權限 */}
                      <Route
                        exact
                        path="/"
                        element={<RoleBasedRoute allowedRoles={["admin", "root"]} />}
                      >
                        <Route exact path="admin" element={<Admin />} />
                      </Route>
                      <Route
                        exact
                        path="/"
                        element={<RoleBasedRoute allowedRoles={["root"]} />}
                      >
                        <Route exact path="send-mail-test" element={<SendMail />} />
                        <Route exact path="send-image-test" element={<SendImage />} />
                      </Route>
                    </Route>
                  </Route>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </ChakraProvider>
            </MailsDataProvider>
          </UserDataProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
