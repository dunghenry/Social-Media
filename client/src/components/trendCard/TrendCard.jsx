import React from 'react'
import './trendCard.scss';
import { trendData } from '../../data/trendData'
const TrendCard = () => {
    return (
        <div className="TrendCard shadow-lg shadow-cyan-500/300">
            <h3>Trends for you</h3>
            {
                trendData.map((trend, index) =>{
                    return (
                        <div key={index} className='trend'>
                            <span>#{trend.name}</span>
                            <span>#{trend.shares}k shares</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TrendCard