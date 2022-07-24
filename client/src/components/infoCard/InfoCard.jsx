import React from 'react'
import './infoCard.scss';
import { UilPen } from '@iconscout/react-unicons';
const InfoCard = () => {
    return (
        <div className="InfoCard shadow-lg shadow-cyan-500/300">
            <div className="infoHead">
                <h3>Your Info</h3>
                <div>
                    <UilPen width="2rem" height="2rem" />
                </div>
            </div>
            <div className="info">
                <span>
                    <b>Status </b>
                </span>
                <span>in Relationship</span>
            </div>
            <div className="info">
                <span>
                    <b>Lives in </b>
                </span>
                <span>Viet Nam</span>
            </div>
            <div className="info">
                <span>
                    <b>Works at </b>
                </span>
                <span>Dung Henry</span>
            </div>
        </div>
    )
}

export default InfoCard