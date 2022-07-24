import React from 'react'
import './post.scss';
import PostShare from '../postShare/PostShare';
import Posts from '../posts/Posts';
const PostSide = () => {
    return (
        <div className="PostSide">
            <PostShare/>
            <Posts/>
        </div>
    )
}

export default PostSide