import React, { useState, useRef } from 'react'
import './postShare.scss';
import ProfileImage from '../../assets/images/profileImg.jpg';
import { UilScenery } from '@iconscout/react-unicons';
import { UilPlayCircle } from '@iconscout/react-unicons';
import { UilLocationPoint } from '@iconscout/react-unicons';
import { UilSchedule } from '@iconscout/react-unicons';
import { UilTimes } from "@iconscout/react-unicons";
const PostShare = () => {
    const [image, setImage] = useState(null);
    const imageRef = useRef();
    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImage({
                image: URL.createObjectURL(img)
            })
        }
    }
    return (
        <div className="PostShare">
            <img src={ProfileImage} />
            <div>
                <input type="text" placeholder="What's happening" />
                <div className="postOptions">
                    <div className="option" style={{ color: '#4CB256' }} onClick={() => imageRef.current.click()}>
                        <UilScenery />
                        Photo
                    </div>
                    <div className="option" style={{ color: '#4A4EB7' }}>
                        <UilPlayCircle />
                        Video
                    </div>
                    <div className="option" style={{ color: '#EF5757' }}>
                        <UilLocationPoint />
                        Location
                    </div>
                    <div className="option" style={{ color: '#E1AE4A' }}>
                        <UilSchedule />
                        Schedule
                    </div>
                    <button className="button ps-button">Share</button>
                    <div style={{ display: 'none' }}>
                        <input type="file" name="myImage" ref={imageRef} onChange={onImageChange} />
                    </div>
                </div>
                {
                    image && (
                        <div className="previewImage">
                            <UilTimes onClick={() => setImage(null)} />
                            <img src={image.image} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default PostShare;