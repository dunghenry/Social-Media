import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <Link to="/login">
        <button className="px-5 text-white py-2 bg-purple-500 hover:bg-pink-400 transition-all duration-300 hover:text-black font-bold rounded-[8px] mr-4">Login</button>
      </Link>
      <Link to="/register">
        <button className="text-20 text-white px-5 py-2 bg-purple-500 hover:bg-pink-400 transition-all duration-300 hover:text-black font-bold rounded-[8px]">Register</button>
      </Link>
    </div>
  )
}

export default Navbar;