
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath)); //set a static public path 

io.on('connection', (socket)=>{
	console.log('New user connected');

	socket.emit('newMessage', {
		from:"Admin",
		text:"Welcome to the chat app",
		createdAt: new Date().getTime()
	});

	socket.broadcast.emit('newMessage',{
		from:"Admin",
		text:"A New user joined the chat",
		createdAt: new Date().getTime()
	})

	socket.on('createMessage', function(msg){
		console.log('Message from client', msg);
		io.emit('newMessage', {
			from: msg.from,
			text: msg.text,
			createdAt: new Date().getTime()
		});

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