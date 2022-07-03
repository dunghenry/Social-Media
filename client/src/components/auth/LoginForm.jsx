import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useFormik } from "formik";
import * as Yup from "yup";
import {useNavigate} from 'react-router-dom';
import {loginUser} from '../../store/api/apiRequest';
import './styles.scss';
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: 'Haha',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required").min(7, "Must be 7 characters or more"),
      password: Yup.string().required("Required").matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,15}$/, "Password must be 7-15 characters and contain at least one letter, one number and a special character"),
    }),
    onSubmit: (values) => {
      const {username, password} = values;
      const user = {username, password};
      loginUser(user, dispatch, navigate);
    }
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-2">
        <label htmlFor="username" className="font-bold">User Name :</label>
        <input values={formik.values.username} onChange={formik.handleChange} id="username" placeholder="Enter username..." className="w-full p-1.5 border mt-2" />
        {formik.errors.username && <p className="errorMsg">{formik.errors.username}</p>}
      </div>
      <div className="mb-2">
        <label htmlFor="password" className="font-bold">Password :</label>
        <input value={formik.values.password} onChange={formik.handleChange} type="password" id="password" placeholder="Enter password..." className="w-full p-1.5 border mt-2" />
        {formik.errors.password && <p className="errorMsg">{formik.errors.password}</p>}
      </div>
      <button type="submit" className="w-full rounded-md p-3 my-2 font-semibold tracking-wider bg-blue-600 text-white uppercase border-2 hover:bg-purple-900">Register</button>
    </form>
  )
}

export default LoginForm