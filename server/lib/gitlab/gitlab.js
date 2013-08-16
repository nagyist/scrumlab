/*!
 * gitlab - gitlab/gitlab.js
 * Copyright(c) 2013 Sebastian Sebald (http://www.distractedbysquirrels.com)
 * MIT Licensed
 */

'use strict';

var express = require('express'),
	request = require('request');

var	app = express();

// Helpers.
function isString(value){return typeof value == 'string';}
function isObject(value){return value != null && typeof value == 'object';}
function isFunction(value){return typeof value == 'function';}

// Gitlab module
// -------------------------
function Gitlab ( config, token ) {
	var self = this;

	// Missing something?
	if( !config.uri ) {
		throw new Error('No URI specified! Please specify the URI of your Gitlab installation.');
	}
	if( !config.api ) {
		throw new Error('No Gitlab API specified! Please specify the path to the Gitlab API (like "/api/v3").');
	}

	this.base =  config.uri.replace(/\/+$/, '') + config.api.replace(/\/+$/, '');
	this.token = token;

	// Setup request.
	this.request = request.defaults({
		strictSSL: (typeof config.strictSSL !== 'undefined' ) ? config.strictSSL : true
	});

	// Shorthand for requests.
	this.req = function ( a1, a2, a3, a4, a5 ) {
		var method, path, qs, token, callback;
		// Helper to create netter responses from the Gitlab responses.
		var handleGitlabStatus = function ( body ) {
			// If an unautorized request is send to the Gitlab API it will just anaswer with a message:
			// {"message":"401 Unauthorized"} insted of sending a 401.
			return /401 Unauthorized/.test(body) ? 401 : 200;
		};

		switch(arguments.length) {
			case 5:
				// All good.
				method = a1;
				path = a2;
				qs = a3;
				token = a4;
				callback = a5;
				break;
			case 4:
				// No qs (a3 => token).
				if ( isString(a3) ) {
					method = a1;
					path = a2;
					token = a3;
					callback = a4;
					break;
				// No token (a4 => callback).
				} else if ( isFunction(a4) ) {
					method = a1;
					path = a2;
					qs = a3;
					callback = a4;
					break;
				}
				// Fallthrough.
			case 3:
				callback = a3;
				// Fallthrough.
			case 2:
				// No path => error.
				if ( !isString(a1) ) {
					throw "Exptected a path to be specified. Found none."
				}
				// No method (a1 => path).
				if ( !/get|post|delete|put/i.test(a1) ) {
					method = 'get';
					path = a1;
				}

				// No qs (a2 => token or callback)
				if ( isString(a2) ) {
					token = a2;
				} else {
					qs = a2;
				}
				break;				// No path => error.
				if ( !isString(a1) ) {
					throw "Exptected a path to be specified. Found none."
				}
				// No method (a1 => path).
				if ( !/get|post|delete|put/i.test(a1) ) {
					method = 'get';
					path = a1;
				}

				// No qs (a2 => token or callback)
				if ( isString(a2) ) {
					token = a2;
				} else {
					qs = a2;
				}
			default:
				throw "Expected between 2-5 arguments [method, path, qs, token, callback], got" +
					arguments.length + " arguments.";
		}

		// Got token?
		if( !(token && qs.private_token) ) {
			console.log('WARNING: No private token specified! ' +
				'Request to Gitlab will most likely fail.');
		}

		// Make request.
		this.request[method.toLowerCase()]({
				url: self.base + path,
				headers: {
					'PRIVATE-TOKEN': token || ''
				}
			},
			function ( error, response, body ) {
				callback( handleGitlabStatus(body), body );
			}
		);
	};

	// Projects
	// -------------------------
	this.projects = {
		all: function ( token, callback ) {
			self.req( '/projects', token, callback );
		}
	};
}


// Authentication
// -------------------------
Gitlab.prototype.login = function ( email, pwd, callback ) {
	var self = this;

	this.request.post(
		{
			url: self.base + '/session',
			qs: { email: email, password: pwd }
		},
		function ( error, response, body ) {
			body = JSON.parse(body);
			callback( body );
		}
	);
};


module.exports = function ( options ) {
	return new Gitlab( options );
};
