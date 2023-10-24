import { useState } from "react";
import "../App.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const Login = () => {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); 
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/login', {
        Username,
        password,
      }, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const userInfo = response.data; // Assuming the response data contains user info
        setUserInfo(userInfo);
        navigate('/');
      } else {
        setError("Login failed.");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container">
      <form className="login" onSubmit={login}>
        <h1>Login</h1>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
