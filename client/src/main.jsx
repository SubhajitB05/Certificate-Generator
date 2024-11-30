import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.baseURL = 'https://asr-certificate-generator-server.vercel.app';
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
