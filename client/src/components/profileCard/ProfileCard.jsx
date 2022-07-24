import React from 'react';
import { Link } from 'react-router-dom';
import './profileCard.scss';
import Cover from '../../assets/images/cover.jpg';
import Profile from '../../assets/images/profileImg.jpg'
const ProfileCard = () => {
    const ProfilePage = false;
    return (
        <div className="ProfileCard shadow-lg shadow-cyan-500/300">
            <div className="ProfileImages">
                <img src={Cover} />
                <img src={Profile} />
            </div>
            <div className="ProfileName">
                <span>Dung Henry</span>
                <span>Full stack Web devepoler</span>
            </div>
            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>6,866</span>
                        <span>Followings</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>1</span>
                        <span>Followers</span>
                    </div>
                    {ProfilePage && (
                        <>
                            <div className="vl"></div>
                            <div className="follow">
                                <span>3</span>
                                <span>Posts</span>
                            </div>
                        </>
                    )}
                </div>
                <hr />
            </div>
            {ProfilePage ? '' : <span className="profile">
                <Link to="/profile">
                    My Profile
                </Link>
            </span>}
        </div>
    )
}

export default ProfileCard