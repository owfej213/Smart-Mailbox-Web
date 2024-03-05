import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './css/App.css'
import Home from './page/Home.jsx'
import History from './page/History.jsx'
import Statistics from './page/Statistics.jsx'
import Inside_Box from './page/Inside_Box.jsx'
import Admin from './page/Admin.jsx'
function App() {

  return (
    <>
      <BrowserRouter>
      <div className='nav2'>
        <nav>
          <ul>
            <li>
              <Link id='nav-title' to="/">智慧郵箱</Link>
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
          </ul>
        </nav>
        <div className='icon'>
          <a><img src='../../images/bell.png' id='bell'></img></a>
          <a><img src='../../images/account.png' id='account'></img></a>
        </div>
      </div>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/History" element={<History />} />
        <Route path="/Statistics" element={<Statistics />} />
        <Route path="/Inside_Box" element={<Inside_Box />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
