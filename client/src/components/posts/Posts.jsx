import React from 'react'
import './posts.scss';
import { postsData } from '../../data/postsData';
import Post from '../post/Post';
const Posts = () => {
  return (
    <div className="Posts">
        {
            postsData.map((post, index) => {
                return <Post key={index} {...post}/>
            })
        }
    </div>
  )
}

export default Posts