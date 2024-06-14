import { useContext, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
function Chat({ chats }) {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const handleOpenChat = async (id, username, avatar) => {
    try {
      const res = await apiRequest("/chats/" + id);
      setChat({ ...res.data, username, avatar });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const text = formData.get("text");
      if (!text) return;
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats.map((chat) => {
          return (
            <div
              className="message"
              key={chat.id}
              style={{
                backgroundColor: chat.seenBy.includes(currentUser.id)
                  ? "white"
                  : "#f7c14b85",
              }}
              onClick={() =>
                handleOpenChat(
                  chat.id,
                  chat.receiver.username,
                  chat.receiver.avatar
                )
              }
            >
              <img src={chat.receiver.avatar || "/noavatar.jpg"} alt="" />
              <span>{chat.receiver.username}</span>
              <p>{chat.lastMessage}</p>
            </div>
          );
        })}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.avatar || "/noavatar.jpg"} alt="" />
              <span>{chat.username} </span>
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chat.messages.map((message) => {
              return (
                <div
                  className="chatMessage"
                  style={{
                    alignSelf:
                      message.userId === currentUser.id
                        ? "flex-end"
                        : "flex-start",
                    textAlign:
                      message.userId === currentUser.id ? "right" : "left",
                  }}
                  key={message.id}
                >
                  <p>{message.text}</p>
                  <span>{format(message.createdAt)}</span>
                </div>
              );
            })}
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
