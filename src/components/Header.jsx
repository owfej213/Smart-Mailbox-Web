import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Login from '../page/Login.jsx';
import Home from '../page/Home.jsx';
import History from '../page/History.jsx';
import Statistics from '../page/Statistics.jsx';
import Inside_Box from '../page/Inside_Box.jsx';
import Admin from '../page/Admin.jsx';
import Test from '../page/FirebaseTest.jsx';

const Nav = styled.nav`
    margin-right: auto;
    padding: 10px 10px;
    display: flex;
    align-items: center;

    ul {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    li {
        padding: 0 10px;
        display: inline;
    }
    a {
        display:inline-block;
        color: white;
        font-size: 1em;
        font-weight: bolder;
        text-decoration: none;
    }
`

const NavBody = styled.div`
    background-color: rgb(82, 113, 255);
    display: flex;
`

const NavTitle = styled(Link)`
    font-size: 1.5em !important;
    margin-right: 10px;
`

const Icon = styled.div`
    display: flex;
    align-items: center;
    margin-right: 1em;
    a {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5em 0.8em;
    }
`

const Bell = styled.img`
    max-width: 32px;
    max-height: 32px;
    width: auto;
    height: auto;
`

const Account = styled.img`
    max-width: 40px;
    max-height: 40px;
    width: auto;
    height: auto;
`

function Header() {

  return (
    <>
        <HashRouter>
            <NavBody>
                <Nav>
                    <ul>
                        <li>
                            <NavTitle to="/">智慧郵箱</NavTitle>
                        </li>
                        <li>
                            <Link to="/History">歷史紀錄</Link>
                        </li>
                        <li>
                            <Link to="/Statistics">圖表統計</Link>
                        </li>
                        <li>
                            <Link to="/Inside_Box">郵箱內部</Link>
                        </li>
                        <li>
                            <Link to="/Admin">管理介面</Link>
                        </li>
                        <li>
                            <Link to="/Login">登入測試</Link>
                        </li>
                        <li>
                            <Link to="/Test">FireBase測試</Link>
                        </li>
                    </ul>
                </Nav>
                <Icon>
                    <a><Bell src='images/bell.png'></Bell></a>
                    <a><Account src='images/account.png'></Account></a>
                </Icon>
            </NavBody>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/History" element={<History />} />
                <Route path="/Statistics" element={<Statistics />} />
                <Route path="/Inside_Box" element={<Inside_Box />} />
                <Route path="/Admin" element={<Admin />} />
                <Route path="/Test" element={<Test />} />
            </Routes>
        </HashRouter>
    </>
  )
}

export default Header;
