import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
const RegisterForm = () => {
    const dispatch = useDispatch();
    const handleRegister = (e) => {
        e.preventDefault();
    }
    return (
        <form onSubmit={handleRegister}>
            <div className="mb-2">
                <label htmlFor="firstName" className="font-bold">First Name :</label>
                <input type="text" id="firstName" placeholder="" className="w-full p-1.5 border mt-2" />
            </div>
            <div className="mb-2">
                <label htmlFor="lastName" className="font-bold">Last Name :</label>
                <input type="email" id="lastName" placeholder="" className="w-full p-1.5 border mt-2" />
            </div>
            <div className="mb-2">
                <label htmlFor="password" className="font-bold">Password :</label>
                <input type="password" id="password" placeholder="" className="w-full p-1.5 border mt-2" />
            </div>
            <div className="mb-2">
                <label htmlFor="cf_password" className="font-bold">Confirm Password :</label>
                <input type="password" id="cf_password" placeholder="" className="w-full p-1.5 border mt-2" />
            </div>
            <button type="submit" className="w-full rounded-md p-3 my-2 font-semibold tracking-wider bg-blue-600 text-white uppercase border-2 hover:bg-purple-900">Register</button>
        </form>
    )
}

export default RegisterForm