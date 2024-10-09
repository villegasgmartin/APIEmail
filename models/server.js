const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {path, join} = require('path');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.paths = {
			main: '/'
		};
		//middlewares
		this.middelewares();

		//routers
		this.router();
	}

	middelewares() {

		this.app.use(cors());
		this.app.use(morgan('dev'));

		//para obtener datos del front en json
		this.app.use(express.json());
	}
	
	router() {
		this.app.use(this.paths.main, require('../routes/routes'));
	}	

	listen() {
		this.app.listen(this.port, () => {
			console.log('listening on port', this.port);
		});
	}
}

module.exports = Server;
