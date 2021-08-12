import mongoose from 'mongoose';

class Database
{
	connect(): void
	{
		const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

		mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?authSource=admin`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true
		});
		
		mongoose.connection.on('error', () => console.error('Connection Error:'));
		mongoose.connection.once('open', () => console.log('Database Connected'));
	}
}

export default new Database();