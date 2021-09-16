import dotenv from 'dotenv';

if(process.env.NODE_ENV)
{
	const env = process.env.NODE_ENV.toLowerCase().trim();

	if(env == 'production' || env == "prd" || env == "prod")
		dotenv.config({path: '.env'});
	else
		dotenv.config({path: '.env.' + env});
}
else
	dotenv.config({path: '.env'});

import express from 'express';
import database from '../infra/mongoose/db';

import routes from './routes';
import calculatorRoutes from './routes/CalculatorRoutes';
import userRoutes from './routes/UserRoutes';


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

		// CORS
		this.app.use( (req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token, authorization');
			res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
			next();
		});
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

		// Users
		this.app.use(basePath, userRoutes);

		// Calculator
		this.app.use(basePath, calculatorRoutes);
	}
}

export default new App().app;