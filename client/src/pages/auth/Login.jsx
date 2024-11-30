import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {jwtDecode} from 'jwt-decode';
import { useDispatch } from 'react-redux';
import {loginSuccess} from '../../features/auth/authSlice.js';
import axios from 'axios';

const Login = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email:"",
    password:""
  });

  const handleInputChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setUserDetails({...userDetails, [name]:value});
  }

  const handleLogin = (e)=>{
    e.preventDefault();
    axios.post('/login', userDetails).then(({data})=>{
      if(data.success){
        toast.success(data.message);
        const decodedToken = jwtDecode(data.token);
        const userRole = decodedToken.role;

        dispatch(loginSuccess({
          token:data.token,
          user:{id:decodedToken._id, role:userRole},
          role:userRole,
        }))
        if(userRole==='admin'){
          navigate('/generate-certificate');
        }
      }
      else{
        toast.error(data.message);
      }
    }).catch(err=>toast.error(err));
  }
  return (
    <div>
       <h1 className='text-4xl mb-3 text-center'>Login</h1>
      <form onSubmit={handleLogin} className='border p-4 min-w-[380px] rounded'>
        <div className="mb-4 flex flex-col">
          <label className='mb-2'>Email</label>
          <input type="email" name='email' className='bg-transparent border h-[35px] px-2 rounded' onChange={handleInputChange} value={userDetails.email} required/>
        </div>
        <div className="mb-4 flex flex-col">
          <label className='mb-2'>Password</label>
          <input type="password" name='password' className='bg-transparent border h-[35px] px-2 rounded' onChange={handleInputChange} value={userDetails.password} required/>
        </div>
        <button type='submit' className='btn bg-green-600 w-full p-2 rounded hover:bg-green-700 transition-all'>Login</button>
      </form>
      <p className='text-center mt-2'>New User? <span className='text-violet-600'><Link to={'/register'}>Register</Link></span></p>
    </div>
  )
}

export default Login