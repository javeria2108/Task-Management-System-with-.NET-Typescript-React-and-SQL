import './index.css';
import {Register} from "./Users/Register"
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './Users/Login';
import { store } from './redux/store';

function App() {

  return (
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    </Provider>
    
  )
}

export default App
