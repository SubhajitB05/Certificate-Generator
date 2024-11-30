import React from 'react'
import '../../src/App.css';
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div className=''>
        <h1 className='text-6xl text-center'>ASR TECH SOLUTIONS</h1>
        <div className='flex justify-between mt-4'>
          <p>New user? <Link to={'/register'} className='text-violet-500'>Register</Link></p>
          <p>Existing user? <Link to={'/login'} className='text-violet-500'>Login</Link></p>
        </div>
    </div>
  )
}

export default Home