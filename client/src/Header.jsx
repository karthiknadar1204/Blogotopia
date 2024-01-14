import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/profile', {
          withCredentials: true,
        });
        const userInfo = response.data;
        setUserInfo(userInfo);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const logout = () => {
    axios.post('http://localhost:4000/logout', {
      withCredentials: true,
    });
    setUserInfo(null);
  };

  const username = userInfo?.Username;

  return (
    <header className='bg-red-800 flex'>
      <Link to="/" className="logo">
        BlogoTopia
      </Link>
      <nav>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {userInfo ? (
              <>
                <Link to="/create">Create new post</Link>
                <button onClick={logout} className='logout'>Logout</button>
                <div className="user-profile">
                  <Link to={`/profile/${userInfo.id}`}>
                    <span className='username'>Hello {username}</span>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                {!loading && (
                  <Link to="/register" className="register-btn">
                    Register
                  </Link>
                )}
              </>
            )}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
