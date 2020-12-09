require('dotenv').config();
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const server = express();
const port = process.env.PORT || 5000;
const database = process.env.DB || 'CK_Articles';
const articleController = require('./controller');

//connect database

mongoose
	.connect(process.env.MONGO_URI, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
	.then(() => console.log('Database Connected'))
	.catch((err) => {
		throw Error(err.message);
	});

const corsOptions = {
	origin: ["http://localhost:3000", "https://www.christinakopecky.com"]
}

server.use(express.json());
server.use(cors(corsOptions))
server.use('/articles', articleController);
server.get('/', (req, res) => {
    res.status(200).json({Message: 'sanity check...'})
})
server.listen(port, () => {
	console.log(`server is listening on port ${port}`);
});
//keeps server awake
setInterval(() => {
  http.get(`http://${process.env.HOSTED_SITE}`);
}, (1000 * 60 * 15));