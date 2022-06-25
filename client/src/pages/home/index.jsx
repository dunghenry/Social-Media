import { useState, useEffect } from 'react';
import './home.scss'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const { user } = useSelector((state) => ({ ...state.auth }))
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>Home</div>
  )
}

export default Home