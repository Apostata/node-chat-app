
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();

app.use(express.static(publicPath)); //set a static public path 

io.on('connection', (socket)=>{
	console.log('New user connected');

	socket.on('join', (params, callback)=>{
		if(!isRealString(params.name) || !isRealString(params.room)){
			return callback('Name and Room name are required!');
		}

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);
		//socket.leave(params.room);

		//io.emit -> io.to('room').emit
		//socket.broadcast.emit -> socket.bradcast.to('room').emit
		//socket.emit 
		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app"));
		socket.broadcast.to(params.room).emit('newMessage',generateMessage("Admin", `${params.name} has joined.`));
		callback();
	});

	socket.on('createMessage', function(msg, callback){
		var user = users.getUser(socket.id);
		if(user && isRealString(msg.text)){
			io.to(user.room).emit('newMessage', generateMessage(user.name, msg.text));
		}
		
		callback();
		/*socket.broadcast.emit('newMessage',{ // socket.broadcast.emit - envia para todo mundo menos o próprio usuário quem enviou
			from:msg.from,
			text:msg.text,
			createdAt: new Date().getTime()
		});*/
	});

	socket.on('createLocationMessage', (coords)=>{
		var user = users.getUser(socket.id);
		if(user){
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
		}
	});


	socket.on('disconnect',()=>{
		console.log('user has disconnected');
		var user = users.removeUser(socket.id);

		if(user){
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left`));
		}
	});
});


server.listen(port, ()=>{
	console.log(`Server running at port ${port}`)
})