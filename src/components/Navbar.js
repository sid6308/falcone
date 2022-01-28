import { NavLink } from "react-router-dom";
import "./Styles.css";

export const Navbar = () => {
  return (
    <nav className="nav-container">
      <NavLink className="nav-item1" to="/">
        Reset
      </NavLink>

      <NavLink className="nav-item2" to="/">
        Greek Trust Home
      </NavLink>
    </nav>
  );
};
