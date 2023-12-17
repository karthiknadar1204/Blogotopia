import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from './UserContext';

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/profile', {
          withCredentials: true,
        });
        const userInfo = response.data;
        setUserInfo(userInfo);
        setLoading(false); // Set loading to false when data is received
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log(userInfo);

  const logout = () => {
    axios.post('http://localhost:4000/logout', {
      withCredentials: true,
    });
    setUserInfo(null);
  };
  const username = userInfo?.Username;

  return (
    <header className='bg-red-800 flex' >
      <Link to="/" className="logo">
        BlogoTopia
      </Link>
      <nav >
        {loading ? ( // Show a loading indicator while data is being fetched
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
                <Link to="/register">Register</Link>
              </>
            )}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
