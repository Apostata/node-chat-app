const expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString', ()=>{
	it('Should reject no string values', (done)=>{
		var res = isRealString(123);
		expect(res).toBe(false);
		done();
	});

	it('Should reject strings with only spaces', (done)=>{
		var res = isRealString('      ');
		expect(res).toBe(false);
		done();
	});

	it('Should allow strings with non-spaces characters', (done)=>{
		var res = isRealString('   Rene    ');
		expect(res).toBe(true);
		done();
	});
})
//import isRealString
	//should reject no string values
	//should reject string with only spaces
	//should allow strings with non-spaces characters
