import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/auth/Register';
import Home from './pages/Home';
import { Provider } from "react-redux";
import Login from './pages/auth/Login';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {store} from './app/store.js';
import GenerateCertificate from './pages/dashboard/GenerateCertificate.jsx';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
    <BrowserRouter>
      <ToastContainer position="top-right" theme="colored" autoClose={2500} />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/generate-certificate' element={<GenerateCertificate/>}/>
        {/* <Route path='/dashboard' element={<Dashboard/>}/> */}
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
