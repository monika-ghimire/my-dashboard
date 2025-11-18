import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top navbar with toggle button for small screens */}
      <nav className="navbar d-lg-none position-fixed top-0 start-0">
        <div className="container-fluid">
        
          <button
            className="btn btn-outline-dark"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`bg-dark text-white  vh-100 p-3 ${
          isOpen ? "d-block" : "d-none"
        } d-lg-block`}
        style={{ width: "220px", zIndex: 1050 }}
      >
        {/* Close button only for small screens */}
        <div className="d-lg-none mb-3 text-end">
          <button
            className="btn btn-outline-light"
            onClick={() => setIsOpen(false)}
          >
            ✖
          </button>
        </div>

       
        <ul className="nav flex-column mt-4">
          <li className="nav-item mb-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `btn w-100 text-start ${isActive ? "btn-primary" : "btn-dark"}`
              }
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `btn w-100 text-start ${isActive ? "btn-primary" : "btn-dark"}`
              }
            >
              Users
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Optional overlay for small screens */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none"
          onClick={() => setIsOpen(false)}
          style={{ zIndex: 1040 }}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
