import React from 'react'
import FollowersCard from '../followersCard/FollowersCard';
import LogoSearch from '../logoSearch/LogoSearch';
import ProfileCard from '../profileCard/ProfileCard';
import './profile.scss';
const ProfileSide = () => {
    return (
        <div className="ProfileSide">
            <LogoSearch/>
            <ProfileCard/>
            <FollowersCard/>
        </div>
    )
}

export default ProfileSide