import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});
let onlineUser = [];

const addUser = (userId, socketID) => {
  const userExists = onlineUser.find((user) => user.userId === userId);
  if (!userExists) onlineUser.push({ userId, socketID });
};

const removeUser = (socketID) => {
  onlineUser = onlineUser.filter((user) => user.socketID !== socketID);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};
io.listen(4000);

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log(onlineUser)
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    console.log(receiverId);
    const receiver = getUser(receiverId);
    console.log(receiver);

    io.to(receiver.socketID).emit("getMessage", data);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});
