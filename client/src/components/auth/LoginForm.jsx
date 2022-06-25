import { useState } from 'react'
import { useDispatch } from 'react-redux';
const LoginForm = () => {
  const dispatch = useDispatch();
  const handleLogin = (e) =>{
    e.preventDefault();
  }
  return (
    <form onSubmit={handleLogin} >
      <div className="mb-2">
        <label htmlFor="name" className="font-bold">User Name :</label>
        <input type="text" id="name" placeholder="" className="w-full p-1.5 border mt-2" />
      </div>
      <div className="mb-2">
        <label htmlFor="password" className="font-bold">Password :</label>
        <input type="password" id="password" placeholder="" className="w-full p-1.5 border mt-2" />
      </div>
      <button type="submit" className="w-full rounded-md p-3 my-2 font-semibold tracking-wider bg-blue-600 text-white uppercase border-2 hover:bg-purple-900">Register</button>
    </form>
  )
}

export default LoginForm