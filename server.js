const express = require('express');
const app = express();
const http = require('http').createServer(app);

const port = process.env.port || 80;

http.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Index.html');
});
// Socket
const io = require('socket.io')(http);
io.on('connection', (socket) => {
    console.log('Connected...');
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    })
})