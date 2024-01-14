import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./UserContext";


const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/profile", {
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
    axios.post("http://localhost:4000/logout", {
      withCredentials: true,
    });
    setUserInfo(null);
  };

  const username = userInfo?.Username;

  return (
    <div className="">
      <header className="bg-black text-lime-500 text-2xl py-8 font-mono px-8 flex justify-between items-center">
        <div className="font-semibold text-[1.6rem]">
          <Link to="/" className="logo">
            <p>{"<Script.js/>"}</p>
          </Link>
        </div>
        <div className="hidden">
          {/* <Link to={`/profile/${userInfo.id}`}>
            <span className="">Hello {username}</span>
          </Link> */}
        </div>
        <nav className="flex gap-3">
          {loading ? ( // Show a loading indicator while data is being fetched
            <p>Loading...</p>
          ) : (
            <>
              {userInfo ? (
                <>
                  <button className="hidden md:block text-lime-500 px-4 bg-black md:py-2 border-2 border-lime-500">
                    {" "}
                    <Link to="/create">Create post</Link>
                  </button>
                  <button className="block md:hidden px-2 md:px-4 bg-lime-500 md:py-2 border-2 border-lime-500">
                    <Link>➕</Link>
                  </button>

                  <button
                    onClick={logout}
                    className="hidden md:block bg-lime-500 px-4 text-black py-2"
                  >
                    Logout
                  </button>
                  <button
                    onClick={logout}
                    className="block md:hidden border-2 border-lime-500 px-4 bg-black py-2"
                  >
                    📴
                  </button>
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
      <div className="h-2 from-lime-700 via-lime-200 to-lime-700  bg-gradient-to-r "></div>
      {/* <div className="absolute -z-1 gradient-bg"></div> */}
    </div>

  );
};

export default Header;
