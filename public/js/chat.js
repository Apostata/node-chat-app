var socket = io(); //inicia conexão com o socket io do server
moment.locale('pt-br');

function scrollToBottom(){
	// selectors
	var messages = jQuery('#messages');
	var newMessage = messages.children('li:last-child');

	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();
	//heights

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
		//console.log('Should scroll');
		messages.scrollTop(scrollHeight);
	}
};

socket.on('connect', function(){
	console.log('connected to server');

});

socket.on('disconnect', function(){
	console.log('disconnected from server');
});

socket.on('newMessage', function(msg){
	var formattedTime = moment(msg.createdAt).format('H:mm');
	var template = jQuery('#message-template').html();
	var html = Mustache.render(template, {
		text: msg.text,
		from:msg.from,
		createdAt:formattedTime
	});

	jQuery('#messages').append(html);
	scrollToBottom();
});

socket.on('newLocationMessage',function(msg){
	var formattedTime = moment(msg.createdAt).format('H:mm');
	var template = jQuery('#location-message-template').html();
	var html = Mustache.render(template, {
		from: msg.from,
		url:msg.url,
		createdAt: formattedTime
	});

	jQuery('#messages').append(html);
	scrollToBottom();
	/*var li =jQuery('<li></li>');
	var a = jQuery('<a target="_blank">My current location</a>');

	li.text(`${msg.from} ${formattedTime}:  `);
	a.attr('href', msg.url);
	li.append(a);
	jQuery('#messages').append(li);*/
})


jQuery('#message-form').on('submit', function(e){
	e.preventDefault();

	var messageTextBox = jQuery('[name=message]');

	socket.emit('createMessage', {
		from:'User',
		text: messageTextBox.val()
	}, function(){
		messageTextBox.val('');
	});
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(e){
	if(!navigator.geolocation){
		return alert('Geolocation is not supported by your browser');
	}

	locationButton.attr('disabled', 'disabled').text('Sending location...');

	navigator.geolocation.getCurrentPosition(function(position){
		locationButton.removeAttr('disabled').text('Send location');
		socket.emit('createLocationMessage',{
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	},
	function(){
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch location');
	})
});
