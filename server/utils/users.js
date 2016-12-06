class Users{
	constructor(){
		this.users = [];
	}

	addUser(id, name, room){
		var user = {id, name, room};
		this.users.push(user);
		return user;
	}

	removeUser(id){
		return this.getUser(id)
	}

	getUser(id){
		var user = this.users.filter((user)=> user.id === id)[0];
		if(user){
			this.users = this.users.filter((resUser)=> resUser.id !== user.id);
		}
		return user;
	}

	getUserList(room){
		var users = this.users.filter((user)=> user.room === room);
		var namesArray = users.map((user)=> user.name);

		return namesArray;
	}
}

/*class Person{
	constructor(name, age){
		this.name = name;
		this.age =age;
	}

	getUserDescription(){
		return `${this.name} is ${this.age} year(s) old.`
	}
}

var me = new Person('rene', 32);
console.log('this.name', me.name, 'this.age',me.age);
var description = me.getUserDescription();
console.log(description);*/
module.exports = {Users};