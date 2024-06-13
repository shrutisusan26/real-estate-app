import { useNavigate } from "react-router-dom";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import apiRequest from "../../lib/apiRequest";

function ProfileUpdatePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");
  const { currentUser, updateUserInfo } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    setError("");
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
      });
      updateUserInfo(res.data);
      setLoading(false);

      navigate("/profile");
    } catch (err) {
      setLoading(false);
      setError(res.data.message);
    }
  };
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button disabled={loading}>Update</button>
          {err && <span>{err}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={currentUser.avatar || "/noavatar.jpg"}
          alt=""
          className="avatar"
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
