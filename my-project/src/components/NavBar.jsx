import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // <-- добавили
import "../styles/NavBar.css";

export default function NavBar() {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="navbar">
      <h2>Rick & Morty Explorer</h2>

      <div className="links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/items">Characters</NavLink>

        {!currentUser ? (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/profile">Profile</NavLink>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
