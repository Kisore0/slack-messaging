let users = [];

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    socket.on("join", ({ user }) => {
      users.push(user);
      console.log("socket id: ", socket.id);
    });
  });
};

export default socketHandler;
