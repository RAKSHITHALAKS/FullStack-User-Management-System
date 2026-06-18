import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSignup = async () => {

    if (!name || !email || !password) {
      setMessage("All fields are required");
      setMessageType("error");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      setMessageType("error");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/signup",
        {
          name,
          email,
          password,
        }
      );

      setMessage(response.data.message);
      setMessageType("success");

      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch {
      setMessage("Signup Failed");
      setMessageType("error");
    }
  };

  return (
    <div className="container">
      <div className="card">

        <h1>User Management System</h1>

        <h2>Create Account</h2>

        {message && (
          <div className={messageType}>
            {message}
          </div>
        )}

        <input
          autoComplete="off"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          autoComplete="off"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          autoComplete="new-password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup}>
          Create Account
        </button>

        <p>
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;