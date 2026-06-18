import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (!email) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/profile/${email}`
        );

        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="card">
            <h2>Loading Dashboard...</h2>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="dashboard-card">

          <div className="avatar">
            👤
          </div>

          <h1>Welcome Back, {user.name} </h1>

          <p className="subtitle">
            Manage your account information securely.
          </p>

          <div className="stats-container">

            <div className="stat-box">
              <h3>User ID</h3>
              <p>{user.id}</p>
            </div>

            <div className="stat-box">
              <h3>Member Since</h3>
              <p>{user.member_since}</p>
            </div>

          </div>

          <div className="email-box">
            <strong>Email Address</strong>
            <p>{user.email}</p>
          </div>

          <button
            onClick={() => navigate("/profile")}
          >
            View Profile
          </button>

          <div className="footer">
            Built with React • FastAPI • MySQL
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;