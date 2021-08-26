/* eslint-disable @typescript-eslint/no-var-requires */
const NodeEnvironment = require('jest-environment-node');
const MongoClient = require('mongodb');
const { v4: uuid} = require('uuid');

const env = process.env.NODE_ENV.toLowerCase().trim();
let envFile = ".env";

if (env == 'production' || env == "prd" || env == "prod")
    envFile = ".env";
else
    envFile = `.env.${env}`;

require("dotenv").config({
    path: envFile
}); 

class CustomEnvironment extends NodeEnvironment {

    constructor(config, context) {
        super(config, context);
        this.dbName = `test_db_${uuid()}`;
        console.debug('Test DB generated: ' + this.dbName);
    }

    async setup() {
        await super.setup();

        process.env.DB_DATABASE = this.dbName;
        this.global.process.env.DB_DATABASE = this.dbName;
    }

    async teardown() {

        const { DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;
        const connectionString = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${this.dbName}?authSource=admin`;

        const client = await MongoClient.connect(connectionString);
        const db = await client.db(this.dbName);
        await db.dropDatabase();
        await client.close();

        await super.teardown();
    }
}

module.exports = CustomEnvironment;