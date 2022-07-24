import React from 'react'
import FollowersCard from '../followersCard/FollowersCard';
import InfoCard from '../infoCard/InfoCard';
import LogoSearch from '../logoSearch/LogoSearch';
import './profileLeft.scss';
const ProfileLeft = () => {
    return (
        <div className="ProfileLeft">
            <LogoSearch/>
            <InfoCard/>
            <FollowersCard/>
        </div>
    )
}

export default ProfileLeft