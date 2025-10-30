import React from "react";
import { NavLink } from "react-router-dom";
const Navbar: React.FC = () => {
  return (
    <nav>
      <div>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Trang chủ
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/create"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Viết bài
        </NavLink>
      </div>
    </nav>
  );
};
export default Navbar;
