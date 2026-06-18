import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Profile() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (!email) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/profile/${email}`
        );

        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="card">
            <h2>Loading Profile...</h2>
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

          <h1>User Profile</h1>

          <div className="email-box">
            <strong>Full Name</strong>
            <p>{user.name}</p>
          </div>

          <div className="email-box">
            <strong>Email Address</strong>
            <p>{user.email}</p>
          </div>

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

          <button
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>

          <div className="footer">
            Built with React • FastAPI • MySQL
          </div>

        </div>
      </div>
    </>
  );
}

export default Profile;