import React from 'react'
import './post.scss';
import Comment from '../../assets/images/comment.png';
import Heart from '../../assets/images/like.png';
import NotLike from '../../assets/images/notlike.png';
import Share from '../../assets/images/share.png';
const Post = ({ img, name, desc, likes, liked }) => {
    return (
        <div className="Post shadow-lg shadow-cyan-500/300">
            <img src={img} className="img"/>
            <div className="postReact">
                <img src={liked ? Heart : NotLike}/>
                <img src={Comment}/>
                <img src={Share}/>
            </div>
            <span style={{color: 'rgba(36, 45, 73, 0.65)', fontSize: '12px'}}>{likes} likes</span>
            <div className='detail'>
                <span><b>{name}</b></span>
                <span>{desc}</span>
            </div>
        </div>
    )
}

export default Post