import React from "react";
import { Link } from "react-router-dom";
import LoginForm from '../../components/auth/LoginForm';
import Loading from "../../components/global/Loading";
import { useSelector } from "react-redux";
import './login.scss';
import Logo from '../../assets/images/logo.png'
const Login = () => {
  const { loading } = useSelector((state) => state.auth)
  return (
    <div className="flex items-center mt-10 justify-center min-h-[calc(10vh-6rem)]">
      <div className="container max-w-md p-12 shadow-xl">
        <h2 className="flex my-3 px-20 text-2xl font-semibold text-center justify-items-center">
          <img className="pl-5" src={Logo} />
          <span className="px-5 text">Login</span>
        </h2>
        <LoginForm />
        <div className="text-right text-gray-500">
          You already have an account ?&nbsp;<Link to="/register" className="text-blue-500 underline hover:underline">Register</Link>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default Login;
