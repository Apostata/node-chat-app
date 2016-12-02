
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

	socket.on('createMessage', function(msg){
		console.log('Message from client', msg);
		io.emit('newMessage', {
			from: msg.from,
			text: msg.text,
			createdAt: new Date().getTime()
		})
	});

	socket.on('disconnect',()=>{
		console.log('user has disconnected');
	});
});


server.listen(port, ()=>{
	console.log(`Server running at port ${port}`)
})