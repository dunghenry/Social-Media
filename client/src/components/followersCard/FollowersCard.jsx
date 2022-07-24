import React from 'react';
import './followersCard.scss';
import { followers } from '../../data/followersData';
const FollowersCard = () => {
  return (
    <div className="FollowerCard">
        <h3>Who is following you</h3>
        {
            followers.map((follower, index) =>{
                return <div key={index} className="follower">
                    <div>
                        <img src={follower.img} className="followerImg"/>
                        <div className="name">
                            <span>{follower.name}</span>
                            <span>@{follower.username}</span>
                        </div>
                    </div>
                    <button className="button">Follow</button>
                </div>
            })
        }
    </div>
  )
}

export default FollowersCard