const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    const {id} = socket.client;

    console.log(`USER CONNECTED : ${id}`);

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log(`${msg.name} : ${msg.message}`);
    });

    socket.on("disconnect", () => {
        console.log(`${id} is Disconnected!`);
    })
});


http.listen(4000, () => {
    console.log('server is running... http://localhost:4000');
})