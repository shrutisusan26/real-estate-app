import "./profile.scss";
import List from "../../components/list/list";
import Chat from "../../components/chat/chat";
import apiRequest from "../../lib/apiRequest";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
function Profile() {
  const navigate = useNavigate();
  const { currentUser, updateUserInfo } = useContext(AuthContext);
 

  async function handleLogout() {
    try {
      const res = await apiRequest.post("/auth/logout");
      updateUserInfo(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="profile">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
            <button > Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:{" "}
              <img src={currentUser.avatar || "./noavatar.jpg"} alt="" />{" "}
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail : <b>{currentUser.email}</b>
            </span>
            <button
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </button>
          </div>

          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
            <button>Create New Post</button>
            </Link>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default Profile;
