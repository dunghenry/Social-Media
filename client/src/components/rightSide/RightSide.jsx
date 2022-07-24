import React from 'react'
import './rightSide.scss';
import Home from '../../assets/images/home.png'
import Comment from '../../assets/images/comment.png';
import Noti from '../../assets/images/noti.png';
import { UilSetting } from "@iconscout/react-unicons";
import TrendCard from '../trendCard/TrendCard';
const RightSide = () => {
    return (
        <div className="RightSide">
            <div className="navIcons">
                <img src={Home} />
                <UilSetting />
                <img src={Noti} />
                <img src={Comment} />
            </div>
            <TrendCard/>
            <button className='button r-button'>Share</button>
        </div>
    )
}

export default RightSide