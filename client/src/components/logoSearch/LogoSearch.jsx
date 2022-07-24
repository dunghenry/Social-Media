import React from 'react'
import './logoSearch.scss'
import Logo from '../../assets/images/logo.png'
import { UilSearch } from "@iconscout/react-unicons"
const LogoSearch = () => {
    return (
        <div className="LogoSearch">
            <img src={Logo} />
            <div className="Search">
                <input type="text" placeholder="#Explore" />
                <div className="s-icon">
                    <UilSearch />
                </div>
            </div>
        </div>
    )
}

export default LogoSearch