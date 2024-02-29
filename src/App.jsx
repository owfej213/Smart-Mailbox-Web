import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './css/App.css'
import Home from './page/Home.jsx'
import History from './page/History.jsx'
import Statistics from './page/Statistics.jsx'
import Inside_Box from './page/Inside_Box.jsx'
import Admin from './page/Admin.jsx'
function App() {

  return (
    <BrowserRouter>
    <nav>
      <ul>
        <li>
          <Link className='title' to="/">智慧郵箱</Link>
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
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/History" element={<History />} />
      <Route path="/Statistics" element={<Statistics />} />
      <Route path="/Inside_Box" element={<Inside_Box />} />
      <Route path="/Admin" element={<Admin />} />
    </Routes>
  </BrowserRouter>
    // <>
    //     <div className="top-bar">
    //       <a href="#">Smart Mailbox</a>
    //       <a href="#">Homepage</a>
    //       <a href="C:/Users/sebas/Downloads/df/history.html">History</a>
    //       <a href="#">Statistics</a>
    //       <a href="#">Inside box</a>
    //       <a href="#">Admin</a>
    //     </div>
    //     <div className="login-form">
    //         <h2>Login</h2>
    //         <form action="#" method="post">
    //             <input type="text" name="username" placeholder="Username" required></input>
    //             <input type="password" name="password" placeholder="Password" required></input>
    //             <input type="submit" value="Login"></input>
    //         </form>
    //     </div>
    // </>
  )
}

export default App
