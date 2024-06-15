import { useContext, useEffect, useState } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";
function Navbar() {
  const [open, setOnOpen] = useState(false);
  const { currentUser, updateUserInfo } = useContext(AuthContext);
  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);
  // console.log(number);
  if(currentUser) fetch();

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
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "./noavatar.jpg"} alt="" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
            {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login">Sign In</Link>
            <Link to="/register" className="signup">
              Sign up
            </Link>
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
