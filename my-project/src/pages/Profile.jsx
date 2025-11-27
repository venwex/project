import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p><strong>Email:</strong> {currentUser.email}</p>
      <p><strong>UID:</strong> {currentUser.uid}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
