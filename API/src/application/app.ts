import 'dotenv/config';
import express from 'express';
import database from '../infra/mongoose/db';

import routes from './routes';


class App
{
	public app : express.Application;

	constructor() {
		this.app = express();
	
		this.middlewares();
		this.database();
		this.routes();
	}

	middlewares(): void {
		// support parsing of application/json type post data
		this.app.use(express.json({
			limit: "5mb",
			strict: true
		}));
			
		// support parsing of application/x-www-form-urlencoded post data
		this.app.use(
			express.urlencoded({
			extended: false
			})
		);
	}

	database(): void{
		database.connect();
	}

	routes(): void {
		const basePath = `/api/${process.env.APP_VERSION}`;

		this.app.get('/', async (req, resp) => {
			return resp.send({ version: process.env.APP_VERSION});
		});

		// Index
		this.app.use(routes);
	}
}

export default new App().app;