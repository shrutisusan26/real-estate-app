import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
function Navbar() {
  const [open, setOnOpen] = useState(false);
  const user = true ;
  function clickMenu() {
    setOnOpen(!open);
  }
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="../../public/logo.png" alt="Real Estate Logo" />
          <span>RLEstate</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>

      <div className="right">
        {user ? (
          <div className="user">
                <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt=""/>
                <span>John Doe</span>
                <Link to="/profile" className="profile">

                  <div className="notification">3</div>
                  <span>Profile</span>
                </Link>
          </div>
        ) : (
          <>
            <a href="/">Sign In</a>
            <a href="/" className="signup">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon" onClick={clickMenu}>
          <img src="../../public/menu.png" alt="Hamburger-menu" />
        </div>

        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign In</a>
          <a href="/">Sign Up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
