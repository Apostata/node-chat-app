
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

	/*socket.emit('newEmail', {
		from:'rene@example.com',
		text:'whats going on.',
		createAt:123
	});*/

	socket.emit('newMessage',{
		from:"Sever",
		text:"Welcome to chat Application",
		createdAt: new Date().getTime()
	})

	/*socket.on('createEmail', (newEmail)=>{
		console.log('createEmail', newEmail);
	});*/

	socket.on('createMessage', function(msg){
		var createdAt = new Date().getTime();
		msg.createdAt = createdAt;
		console.log('Message from client', msg);
	});

	socket.on('disconnect',()=>{
		console.log('user has disconnected');
	});
});


server.listen(port, ()=>{
	console.log(`Server running at port ${port}`)
})