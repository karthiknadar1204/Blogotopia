import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from './UserContext';

const Header = () => {
  const {setUserInfo,userInfo}=useContext(UserContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/profile', {
          withCredentials: true,
        });
        const userInfo = response.data;
        setUserInfo(userInfo)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const logout=()=>{
    axios.post('http://localhost:4000/logout',{
      withCredentials:true
    })
    setUserInfo(null);
  }
  const username=userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        BlogoTopia
      </Link>
      <nav>
        {userInfo ? (
          <>
          <span>Hello,{username}</span>
            <Link to="/create">Create new post</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;