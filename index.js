const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');
const{  getUsers , getCurrentUser ,getAllUsers ,leaveUser} = require('./public/utilities/users');    

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));   //static folder

//client connection

io.on('connection',(socket)=>{


socket.on('joinRoom',(name ,room)=>{
        const user = getUsers(socket.id,name,room);
        socket.join(user.room);
        socket.emit('message','Welcome to ChatCord','ChatBot');
        socket.broadcast.to(user.room).emit('user-joined',user.name);
    const msg1 =" i am from connection event";

    io.to(user.room).emit("roomusers",{room:user.room,
        users : getAllUsers(user.room)
        },msg1);

    socket.on('sendmsg',(msg,username)=>{
    socket.broadcast.to(user.room).emit('message',msg,username);
    })

    })

socket.on("disconnect",()=>{
const curUser = getCurrentUser(socket.id);
let name = curUser.name;    
let room = curUser.room;
const users = leaveUser(socket.id);
console.log(name);
console.log(users);
const msg1 ="hi";
socket.broadcast.to(room).emit('endmessage',`${name} has left the chat`);
io.to(room).emit("roomusers",{room:room,
    users : users
    },msg1);



})

})


server.listen(port ,()=>{
    console.log(`listening on port ${port}`);
})

