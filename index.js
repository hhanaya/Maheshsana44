const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 3000;
let players = {};

io.on("connection", (socket) => {
  console.log("Player connected: " + socket.id);

  socket.on("joinGame", (name) => {
    players[socket.id] = { name: name, coins: 1000 };
    io.emit("updatePlayers", players);
  });

  socket.on("disconnect", () => {
    delete players[socket.id];
    io.emit("updatePlayers", players);
  });
});

app.use(express.static("public"));

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
