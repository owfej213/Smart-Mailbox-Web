import { Link, Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import { UserMenu, Notify } from './PopupMenu';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { Navigate } from 'react-router-dom';
const NavBackground = styled.div`
    background-color: rgb(82, 113, 255);
`

const NavBody = styled.div`
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1000px;
`

const Nav = styled.nav`
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

const NavTitle = styled(Link)`
    font-size: 1.5em !important;
    margin-right: 10px;
`

const Icon = styled.div`
    display: flex;
    align-items: center;
`
function Header() {
    const [ user ] = useAuthState(auth);
    return (
        <>
            {!user && (<Navigate to={'/login'} replace={true} />)}
            <NavBackground>
                <NavBody>
                    <Nav>
                        <ul>
                            <li>
                                <NavTitle to="/home">智慧郵箱</NavTitle>
                            </li>
                            <li>
                                <Link to="/home/history">歷史紀錄</Link>
                            </li>
                            <li>
                                <Link to="/home/statistics">圖表統計</Link>
                            </li>
                            <li>
                                <Link to="/home/inside-box">郵箱內部</Link>
                            </li>
                            <li>
                                <Link to="/home/admin">管理介面</Link>
                            </li>
                            {/* <li>
                                <Link to="/home/storage">Storage測試</Link>
                            </li> */}
                        </ul>
                    </Nav>
                    <Icon>
                        <Notify
                            src="images/bell.png"
                            maxWidth="32px" 
                            maxHeight="32px"
                        />
                        <UserMenu
                            src="images/account.png"
                            maxWidth="40px" 
                            maxHeight="40px"
                        />
                    </Icon>
                </NavBody>
            </NavBackground>
            <Outlet />
        </>
    )
}

export default Header;
