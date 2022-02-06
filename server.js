const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// app.get('/', function (req, res) {
// 	res.send('Hello World!');
// });

app.use(express.static(path.join(__dirname, 'static')));

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}!`);
});