import {Link} from "react-router-dom";
import Navbar from './Navbar';
import './header.scss';
import Logo from '../../assets/images/logo.png'
const Header = () => {
    return (
        <header className="sticky top-0 z-10 py-4 min-h-16 bg-gray-50">
            <div className="flex flex-wrap items-center justify-between max-w-6xl px-4 mx-auto">
                <h1 className="text-2xl font-semibold">
                    <Link to="/" className="flex">
                        <img src={Logo}/>
                        <span className="px-2 text-logo">Social Media</span>
                    </Link>
                </h1>
                <Navbar/>
            </div>
        </header>
    )
}

export default Header;