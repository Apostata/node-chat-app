var socket = io(); //inicia conexão com o socket io do server

socket.on('connect', function(){
	console.log('connected to server');

});

socket.on('disconnect', function(){
	console.log('disconnected from server');
});

socket.on('newMessage', function(msg){
	console.log('newMessage', msg);
});