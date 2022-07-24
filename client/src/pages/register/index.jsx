import React from 'react'
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';
import Loading from '../../components/global/Loading';
import { useSelector } from 'react-redux';
import './register.scss';
import Logo from '../../assets/images/logo.png'
const Register = () => {
  const {loading} = useSelector((state) => state.auth);
  return (
    <div className="flex mt-5 items-center justify-center min-h-[calc(10vh-6rem)]">
      <div className="container max-w-md p-12 shadow-xl">
      <h2 className="flex my-3 px-20 text-2xl font-semibold text-center justify-items-center">
          <img className="pl-5" src={Logo}/>
          <span className="px-3 text">Register</span>
        </h2>
        <RegisterForm />
        <div className="text-right text-gray-500">
          You already have an account ?<Link to="/login" className="text-blue-500 underline hover:underline"> Login</Link>
        </div>
      </div>
      {loading && <Loading/>}
    </div>
  )
}

export default Register