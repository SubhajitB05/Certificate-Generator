import {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';


const Register = () => {

  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    fullName:"",
    email:"",
    password:"",
    confirmPassword:""
  });

  const handleInputChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setUserDetails({...userDetails, [name]:value});
  }

  const handleUserRegistration = async(e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post('/register', userDetails);
      if(data.success){
        toast.success(data.message);
        navigate('/login');
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <div>
      <h1 className='text-4xl mb-3 text-center'>Register</h1>
      <form onSubmit={handleUserRegistration} className='border p-4 min-w-[380px] rounded'>
        <div className="mb-4 flex flex-col">
          <label className='mb-2'>Full Name</label>
          <input type="text" name='fullName' className='bg-transparent border h-[35px] px-2 rounded' onChange={handleInputChange} value={userDetails.fullName} required/>
        </div>
        <div className="mb-4 flex flex-col">
          <label className='mb-2'>Email</label>
          <input type="email" name='email' className='bg-transparent border h-[35px] px-2 rounded' onChange={handleInputChange} value={userDetails.email} required/>
        </div>
        <div className="mb-4 flex flex-col">
          <label className='mb-2'>Password</label>
          <input type="password" name='password' className='bg-transparent border h-[35px] px-2 rounded' onChange={handleInputChange} value={userDetails.password} required/>
        </div>
        <div className="mb-4 flex flex-col">
          <label className='mb-2'>Confirm Password</label>
          {
            userDetails.password==="" && userDetails.confirmPassword!==""? <p className='text-red-500'>Please enter password first</p>:  userDetails.confirmPassword !== "" && userDetails.password!==userDetails.confirmPassword ? <p className='text-red-600'>Password not matched</p> : ""
          }
          <input type="password" name='confirmPassword' className='bg-transparent border h-[35px] px-2 rounded' onChange={handleInputChange} value={userDetails.confirmPassword} required/>
        </div>
        <button type='submit' className='btn bg-green-600 w-full p-2 rounded hover:bg-green-700 transition-all'>Register</button>
      </form>
      <div>
        <p className='text-center mt-3'>Existing User? <span className='text-violet-600'><Link to='/login'>Login</Link></span></p>
      </div>
    </div>
  )
}

export default Register