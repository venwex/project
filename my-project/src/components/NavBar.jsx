import { NavLink } from "react-router-dom";
import "../styles/NavBar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <h2>Rick & Morty Explorer</h2>
      <div className="links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/items">Characters</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
    </nav>
  );
}
