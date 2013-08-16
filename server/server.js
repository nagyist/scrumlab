"use strict";

var express = require('express'),
	http = require('http');

var config = require('./config.js'),
	xsrf = require('./lib/xsrf'),
	protectJSON = require('./lib/protectJSON');

var app = express(),
	server = http.createServer(app),
	sessions = {};

var gitlab = require('./lib/gitlab/gitlab.js')( config.gitlab );

// Configuration
// -------------------------
app.configure(function () {
	app.use(express.logger({ format: ':method :url' }));
	app.use(express.bodyParser());

	app.use(express.cookieParser(config.server.secret));
	app.use(express.session());
	app.use(app.router);

	app.use(protectJSON);

	// Send Headers.
	app.use(function ( req, res, next ) {
		res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
		res.setHeader('Pragma', 'no-cache');
		res.setHeader('Expires', '0');
		return next();
	});
});



// Server
// -------------------------
server.listen(config.server.listenPort, 'localhost', 511, function() {
	console.log('Server started!')
	// Once the server is listening we automatically open up a browser
	var open = require('open');
	open('http://localhost:' + config.server.listenPort + '/');
});

// Authentication
// -------------------------
app.post('/api/login', function ( req, res ) {
	console.log('login');
	gitlab.login(req.body.email, req.body.password, function ( body ) {
		if( body.username ) {
			req.session.user = { 'name': body.username, 'id': body.id };
		}
		if( body.private_token ) {
			sessions[body.id] = body.private_token;
			delete body.private_token;
		}
		res.send( body );
	});
});


// Projects
// -------------------------
app.get(/\/api\/.*/, function ( req, res ) {
	var token;
	// console.log(req.url);
	// console.log(req.method);
	try {
		token = sessions[req.session.user.id];
		gitlab.projects.all( token, function ( status, body ) {
			res.send( status, body );
		});
	} catch (e) {
		console.log('WARNING: Unautorized Request for "' + req.path + '".');
		res.send( 401, 'Unauthorized.' );
	}
});



// Static
// -------------------------
app.get(/\.html$|\.js$|\.css$/, function (req, res ) {
	res.sendfile( req.path , { root: config.server.distFolder });
});

// This route enables HTML5Mode by forwarding missing files to the index.html
app.all('/*', function(req, res) {
	console.log('static');
	// Just send the index.html for other files to support HTML5Mode
	res.sendfile('index.html', { root: config.server.distFolder });
});
