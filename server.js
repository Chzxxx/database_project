const admin = require('firebase-admin');
const express = require('express');
const dev = process.env.NODE_ENV !== 'production'
const next = require('next');
const port = process.env.port || 8081;
const app = next({ dev });
const handle = app.getRequestHandler();
app.prepare()
	.then(() => {
		const server = express()

		server.get('*', (req, res) => {
			return handle(req, res)
		})

		server.listen(port, (err) => {
			if (err) throw err;
			console.log(`This app is running on port ${port}!`);
		})
	})
	.catch((ex) => {
		console.error(ex.stack)
		process.exit(1)
	})
