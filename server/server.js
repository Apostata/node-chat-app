
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const {generateMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath)); //set a static public path 

io.on('connection', (socket)=>{
	console.log('New user connected');

	socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app"));

	socket.broadcast.emit('newMessage',generateMessage("Admin", "A New user joined the chat"));

	socket.on('createMessage', function(msg){
		
		io.emit('newMessage', generateMessage(msg.from, msg.text));

		/*socket.broadcast.emit('newMessage',{ // socket.broadcast.emit - envia para todo mundo menos o próprio usuário quem enviou
			from:msg.from,
			text:msg.text,
			createdAt: new Date().getTime()
		});*/
	});

	socket.on('disconnect',()=>{
		console.log('user has disconnected');
	});
});


server.listen(port, ()=>{
	console.log(`Server running at port ${port}`)
})