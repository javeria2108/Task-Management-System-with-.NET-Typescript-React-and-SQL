import './index.css';
import {Register} from "./Users/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './Users/Login';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import UserDashboard from './components/UserDashboard/UserDashboard';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
      <Route path='/user/dashboard' element={<UserDashboard/>}/>
    </Routes>
    </BrowserRouter>

    
  )
}

export default App
