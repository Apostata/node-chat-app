const path = require('path');
const publicPath = path.join(__dirname, '../public');

const express = require('express');

var app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publicPath)); //set a static public path 

/*app.get('/', (req, res)=>{
	res.send();
});*/

app.listen(port, ()=>{
	console.log(`Server running at port ${port}`)
})