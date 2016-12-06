const expect = require('expect');
const {Users} = require('./users');

var users;

beforeEach(()=>{
	users = new Users();
	users.users =[
		{
			id:'1',
			name:'Rene',
			room:'Node Course'
		},
		{
			id:'2',
			name:'Erica',
			room:'React Course'
		},
		{
			id:'3',
			name:'Ulisses',
			room:'Node Course'
		}
	]
});

describe('Users class', ()=>{
	it('Should add new user', ()=>{
		var NewUsers = new Users();
		var user = {
			id:'123',
			name:'Rene',
			room:'The Office'
		};
		var resUser = NewUsers.addUser(user.id, user.name, user.room);
		expect(NewUsers.users).toEqual([user]);
	});

	it('Should remove a user', ()=>{
		userId = '1';
		var resUser = users.removeUser(userId );
		expect(resUser.id).toBe(userId);
		expect(users.users.length).toBe(2);
	});

	it('Should not remove a user', ()=>{
		var resUser = users.removeUser('4');
		expect(resUser).toNotExist();
		expect(users.users.length).toBe(3);
	});

	it('Should find user', ()=>{
		var id ='2';
		var resUser = users.getUser(id);
		expect(resUser.name).toEqual('Erica');
	});

	it('Should not find user', ()=>{
		var id ='4';
		var resUser = users.getUser(id);
		expect(resUser).toNotExist();
	});

	it('Should return names for Node course', ()=>{
		var userList = users.getUserList('Node Course');
		expect(userList).toEqual(['Rene','Ulisses']);
	});

	it('Should return names for React course', ()=>{
		var userList = users.getUserList('React Course');
		expect(userList).toEqual(['Erica']);
	});
});