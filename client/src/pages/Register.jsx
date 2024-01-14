import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate(); // Hook to navigate to different routes
  const [Username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/register', {
        Username,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setSuccess(true);
      navigate('/login'); // Use navigate to redirect to the login page
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <form className="register" onSubmit={register}>
        <h1>Register</h1>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">Registration successful!</p>}
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
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
