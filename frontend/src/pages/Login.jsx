import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleLogin = async () => {

    if (!email || !password) {
      setMessage("All fields are required");
      setMessageType("error");
      return;
    }

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "email",
        email
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      setMessage("Login Successful");
      setMessageType("success");

      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch {

      setMessage("Invalid Email or Password");
      setMessageType("error");
    }
  };

  return (
    <div className="container">
      <div className="card">

        <h1>User Management System</h1>

        <h2>Login</h2>

        {message && (
          <div className={messageType}>
            {message}
          </div>
        )}

        <input
          autoComplete="off"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          autoComplete="new-password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <p>
          New User?
          <Link to="/"> Signup</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;