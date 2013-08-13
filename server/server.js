"use strict";

var express = require('express'),
	http = require('http');

var config = require('./config.js'),
	xsrf = require('./lib/xsrf'),
	protectJSON = require('./lib/protectJSON');

var app = express(),
	server = http.createServer(app);

var gitlab = require('./lib/gitlab/gitlab.js')( config.gitlab );

// Configuration
// -------------------------
app.configure(function () {
	app.use(express.logger());
	app.use(express.bodyParser());

	app.use(express.cookieParser(config.server.secret));
	app.use(express.session());
	app.use(app.router);
	app.use(express.logger());

	app.use(protectJSON);
});



// Server
// -------------------------
server.listen(config.server.listenPort, 'localhost', 511, function() {
	console.log('Server started!')
	// Once the server is listening we automatically open up a browser
	var open = require('open');
	// open('http://localhost:' + config.server.listenPort + '/');
});

// Authentication
// -------------------------
app.post('/api/login', function ( req, res ) {
	console.log(req.session);

	gitlab.login(req.body.email, req.body.password, function ( body ) {
		if( body.username ) {
			req.session.user = body.username;
		}

		res.send( body );
	});
});


// Projects
// -------------------------
app.get('/api/projects', function ( req, res ) {
	gitlab.projects.all(function ( body ) {
		res.send( body );
	});
});



// Static
// -------------------------
app.get(/\.html$|\.js$|\.css$/, function (req, res ) {
	res.sendfile( req.path , { root: config.server.distFolder });
});

// This route enables HTML5Mode by forwarding missing files to the index.html
app.all('/*', function(req, res) {
	// Just send the index.html for other files to support HTML5Mode
	res.sendfile('index.html', { root: config.server.distFolder });
});
