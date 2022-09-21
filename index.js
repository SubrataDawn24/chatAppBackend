// Node server which will handle socket io connections

const express = require('express');
const app = express();

const http = require('http');

const server = http.createServer(app);
const  {Server}  = require("socket.io");

const io = new Server(server);


var port = process.env.PORT || 8000;

server.listen(port,()=>{
    console.log("server is listening",port)
});
const port = process.env.PORT || 8800;
// const io = require('socket.io')(port,{
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"],
//       allowedHeaders: ["my-custom-header"],
//       credentials: true
//     }});

const user = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', name=>{
        console.log("welcome ", name)
        user[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    });
    socket.on('send', message =>{
        socket.broadcast.emit('recieve', {message: message, name: user[socket.id]})
    });
    
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', user[socket.id]);
        delete user[socket.id]
    });

})
