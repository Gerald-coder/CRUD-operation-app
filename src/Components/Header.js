import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="Header">
      <h1>Redux blog</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="posts">Posts</Link>
          </li>
          {/* <li>
            <Link to="users">Users</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
