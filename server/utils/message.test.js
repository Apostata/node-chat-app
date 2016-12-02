const expect = require('expect');
var {generateMessage} = require('./message');

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