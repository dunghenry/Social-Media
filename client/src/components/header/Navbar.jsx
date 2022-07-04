import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import { logOut } from "../../store/actions/authAction";
import Loading from '../global/Loading';
import { useNavigate } from "react-router-dom";
import { customAxios } from "../../store/api";
import { loginSuccess } from "../../store/slices/authSlice";
const Navbar = () => {
  const {user, loading} = useSelector((state) => state.auth);
  const id = user?.id;
  const accessToken = user?.accessToken;
  // const {_id: id, accessToken} = user ?? {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axios = customAxios(user, dispatch, loginSuccess)
  const handleLogout = () =>{
    logOut(dispatch, id, navigate, accessToken, axios);
  }
  return (
    <div>
      {!user && <><Link to="/login">
        <button className="px-5 text-white py-2 bg-purple-500 hover:bg-pink-400 transition-all duration-300 hover:text-black font-bold rounded-[8px] mr-4">Login</button>
      </Link>
      <Link to="/register">
        <button className="text-20 text-white px-5 py-2 bg-purple-500 hover:bg-pink-400 transition-all duration-300 hover:text-black font-bold rounded-[8px]">Register</button>
      </Link></>}
      {user && (<button className="text-20 px-2 text-white mx-4 py-2 bg-purple-500 hover:bg-pink-400 transition-all duration-300 hover:text-black font-bold rounded-[8px]" onClick={handleLogout}>LogOut</button>)}
      {loading && <Loading/>}
    </div>
  )
}

export default Navbar;