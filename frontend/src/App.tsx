import './index.css';
import {Register} from "./Users/Register"
<<<<<<< HEAD
import { Provider } from 'react-redux';
function App() {

  return (
    <Provider store={}>
      <Register/>
      </Provider>
=======
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

>>>>>>> e6df2cf2bc4591fc40b2f24a6846a871beee0a76
    
  )
}

export default App
