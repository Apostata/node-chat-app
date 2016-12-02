var socket = io(); //inicia conexão com o socket io do server

socket.on('connect', function(){
	console.log('connected to server');

	/*socket.emit('createEmail',{
		to:'erica@example.com',
		text:'Hey. this is Erica'
	});*/

	socket.emit('createMessage', {
		from:"Client",
		text:"Hi server!"
	});
});

socket.on('disconnect', function(){
	console.log('disconnected from server');
});

/*socket.on('newEmail',function(email){
	console.log('New Email', email);
});*/

socket.on('newMessage', function(msg){
	console.log('newMessage', msg);
});