import app from './app';


const port = process.env.SERVER_PORT || '3001';

app.listen(port, () => {
	console.log(process.env.SERVER_PORT);
	console.log('Server started on http://localhost:' + port);
});