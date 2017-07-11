// get npm dependencies
const express = require('express');
const path = require('path');
const http = require('http');

// create app
const app = express();

// Point static path to assets & index
app.use(express.static(__dirname));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

// Get port from environment and store in Express.
const port = process.env.PORT || '3002';
app.set('port', port);


// Create HTTP server.
const server = http.createServer(app);

//Listen on provided port, on all network interfaces.
server.listen(port, () => console.log(`API running on localhost:${port}`));