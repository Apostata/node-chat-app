const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
	it('Should generate the correte message object', (done)=>{
		var from = "Teste";
		var text = "testando";

		var res = generateMessage(from, text);
		
		expect(res.createdAt).toBeA('number');
		expect(res).toInclude({from, text});
		done();
	});
});

describe('generateLocationMessage', ()=>{
	it('Should generate corret location object', (done)=>{
		var from = "Teste 2";
		var latitude = 15;
		var longitude = 18;
		url = `https://www.google.com.br/maps?q=${latitude},${longitude}`;

		var res = generateLocationMessage(from, latitude, longitude);
		expect(res.createdAt).toBeA('number');
		expect(res).toInclude({from, url});
		done();
	})
})