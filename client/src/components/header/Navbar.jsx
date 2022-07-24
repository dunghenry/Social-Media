import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from "../../store/actions/authAction";
import Loading from '../global/Loading';
import { useNavigate } from "react-router-dom";
import { customAxios } from "../../store/api";
import { loginSuccess } from "../../store/slices/authSlice";
import Profile from "../../assets/images/profileImg.jpg"
const Navbar = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const id = user?.id;
  const accessToken = user?.accessToken;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axios = customAxios(user, dispatch, loginSuccess)
  const handleLogout = () => {
    logOut(dispatch, id, navigate, accessToken, axios);
  }
  return (
    <div className="flex">
      {!user && <>
        <div className="mx-8">
          <Link to="/profile" className="flex">
          <img width="40px" className="rounded-full" src={Profile} />
          <span className="pl-2 pt-2 font-bold">Dung Henry</span>
          </Link>
        </div>
        <Link to="/login">
          <button className="button btn px-5 text-white py-2 transition-all duration-300 font-bold rounded-[8px] mr-4">Login</button>
        </Link>
        <Link to="/register">
          <button className="button btn text-20 text-white px-5 py-2 transition-all duration-300 font-bold rounded-[8px]">Register</button>
        </Link></>}
      {user && (<button className="button text-20 px-2 text-white mx-4 py-2  transition-all duration-300 font-bold rounded-[8px]" onClick={handleLogout}>LogOut</button>)}
      {loading && <Loading />}
    </div>
  )
}

export default Navbar;