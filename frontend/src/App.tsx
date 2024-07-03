import './index.css';
import {Register} from "./Users/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './Users/Login';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>

    
  )
}

export default App
