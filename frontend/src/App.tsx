import './index.css';
import {Register} from "./Pages/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './Pages/Login';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import UserDashboard from './Pages/UserDashboard/UserDashboard';
import layout from './layout';
import Layout from './layout';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
      <Route path='/user/dashboard' element={<UserDashboard/>}/>
      <Route path='/layout' element={<Layout/>}/>
    </Routes>
    </BrowserRouter>

    
  )
}

export default App
