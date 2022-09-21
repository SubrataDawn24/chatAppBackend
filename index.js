// Node server which will handle socket io connections

const io = require('socket.io')(process.env.PORT,{
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }});

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
