import { useState, useEffect } from 'react';
import './home.scss'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {customAxios} from '../../store/api';
import {loginSuccess} from '../../store/slices/authSlice';
import { getUsers } from '../../store/actions/userAction';
import { getTimelinePosts } from '../../store/actions/postAction';
import ProfileSide from '../../components/profile/ProfileSide';
import PostSide from '../../components/postSide/PostSide';
import RightSide from '../../components/rightSide/RightSide';
const Home = () => {
  const { user } = useSelector((state) => state.auth)
  const accessToken = user?.accessToken;
  const dispatch = useDispatch();
  const axiosCustom = customAxios(user, dispatch, loginSuccess);
  const handleGetdata = () =>{
    getUsers(dispatch, accessToken, axiosCustom);
  }
  useEffect(() =>{
    getTimelinePosts(dispatch, accessToken, axiosCustom);
  }, [])
  return (
    <div className="Home">
      <ProfileSide/>
      <PostSide/>
      <RightSide/>
    </div>
  )
}

export default Home