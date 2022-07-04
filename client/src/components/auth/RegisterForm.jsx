import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import './styles.scss'
import { registerUser } from '../../store/actions/authAction';
const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("Required").min(3, "Must be 3 characters or more"),
            firstName: Yup.string().required("Required").min(3, "Must be 3 characters or more"),
            password: Yup.string().required("Required").matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,15}$/, "Password must be 7-15 characters and contain at least one letter, one number and a special character"),
            confirmPassword: Yup.string().required("Required").oneOf([Yup.ref("password"), null], "Password must match")
        }),
        onSubmit:(values) =>{
            const {firstName, lastName, password} = values;
            const user = {firstname: firstName, lastname: lastName, password}
            registerUser(user, dispatch, navigate)
        }
    })
   
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-2">
                <label htmlFor="firstName" className="font-bold">First Name :</label>
                <input type="text" value={formik.values.firstName} onChange={formik.handleChange} id="firstName" placeholder="Enter first name..." className="w-full p-1.5 border mt-2" />
                {formik.errors.firstName && <p className="errorMsg">{formik.errors.firstName}</p>}
            </div>
            <div className="mb-2">
                <label htmlFor="lastName" className="font-bold">Last Name :</label>
                <input type="text" value={formik.values.lastName} onChange={formik.handleChange} id="lastName" placeholder="Enter last name..." className="w-full p-1.5 border mt-2" />
                {formik.errors.lastName && <p className="errorMsg">{formik.errors.lastName}</p>}
            </div>
            <div className="mb-2">
                <label htmlFor="password" className="font-bold">Password :</label>
                <input value={formik.values.password} onChange={formik.handleChange} type="password" id="password" placeholder="Enter password..." className="w-full p-1.5 border mt-2" />
                {formik.errors.password && <p className="errorMsg">{formik.errors.password}</p>}
            </div>
            <div className="mb-2">
                <label htmlFor="confirmPassword" className="font-bold">Confirm Password :</label>
                <input value={formik.values.confirmPassword} onChange={formik.handleChange} type="password" id="confirmPassword" placeholder="" className="w-full p-1.5 border mt-2" />
                {formik.errors.confirmPassword && <p className="errorMsg">{formik.errors.confirmPassword}</p>}
            </div>
            <button type="submit" className="w-full rounded-md p-3 my-2 font-semibold tracking-wider bg-blue-600 text-white uppercase border-2 hover:bg-purple-900">Register</button>
        </form>
    )
}

export default RegisterForm