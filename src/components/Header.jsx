import { Link, Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import { UserMenu, Notify } from './PopupMenu';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/firebase';
import { Navigate } from 'react-router-dom';
import Box from './ui/Box';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const NavBackground = styled(Box)`
    background: linear-gradient(180deg, rgb(91, 110, 255) 0%, rgb(100, 118, 255) 100%);
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

function Header() {
    const [ user ] = useAuthState(auth);
    const [ navigate, setNavigate ] = useState(null);
    const [ userData, setUserData ] = useState(null);
    
    useEffect(() => {
        const fetchUserData = async() => {
            if(user !== null) {
                const userDoc = doc(db, `users/${user.uid}`);
                //取得用戶資料
                try {
                    const result = await getDoc(userDoc);
                    
                    setUserData(result.data());
                    
                    if(userData === undefined) setNavigate(<Navigate to={'/register/user-types'} replace={true} />);

                } catch (error) {
                    console.log(error);
                }
            } else {
                setNavigate(<Navigate to={'/login'} replace={true} />);
            }
        }
        fetchUserData();
    }, [])

    return (
        <>
            {navigate}
            <NavBackground>
                <Box
                    mx={"auto"}
                    justifyContent={"space-between"}
                    width={"100%"}
                    maxWidth={"1000px"}
                >
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
                    <Box>
                        <Notify />
                        <UserMenu />
                    </Box>
                </Box>
            </NavBackground>
            <Outlet />
        </>
    )
}

export default Header;
