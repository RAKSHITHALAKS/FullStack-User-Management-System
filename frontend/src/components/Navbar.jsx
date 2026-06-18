import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar">

      <div
        className="logo"
        onClick={() => navigate("/dashboard")}
      >
        User Management Portal
      </div>

      <div className="nav-links">

        <button
          className="nav-btn"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

        <button
          className="nav-btn"
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>

        <button
          className="nav-btn logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;