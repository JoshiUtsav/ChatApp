const express = require('express');
const app = express();
const http = require('http').createServer(app);

const port = process.env.port || 80;

http.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Index.html');
});

// Socket
const io = require('socket.io')(http);
const user = {}
io.on('connection', (socket) => {
  socket.on('new-user-joined', Namee => {
    user[socket.id] = Namee;
    socket.broadcast.emit('user-joined', Namee)
  });
  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg);
  });
})