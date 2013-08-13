/*!
 * gitlab - gitlab/gitlab.js
 * Copyright(c) 2013 Sebastian Sebald (http://www.distractedbysquirrels.com)
 * MIT Licensed
 */

'use strict';

var express = require('express'),
	request = require('request');

var	app = express();

// Helper
var handleGitlabStatus = function ( body ) {
	// If an unautorized request is send to the Gitlab API it will just anaswer with a message:
	// {"message":"401 Unauthorized"} insted of sending a 401.
	return /401 Unauthorized/.test(body) ? 401 : 200;
};


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
	this.defaults = {
		strictSSL: (typeof config.strictSSL !== 'undefined' ) ? config.strictSSL : true
	};
	this.request = request.defaults( this.defaults );


	// Projects
	// -------------------------
	this.projects = {
		all: function ( callback ) {
			self.request.get( self.base + '/projects',
				function ( error, response, body ) {
					callback( handleGitlabStatus(body), body );
				}
			);
		}
	};
}


// Authentication
// -------------------------
Gitlab.prototype.login = function ( email, pwd, callback ) {
	this.request.post(
		{
			url: this.base + '/session',
			qs: { email: email, password: pwd }
		},
		function ( error, response, body ) {
			callback( body );
		}
	);
};


module.exports = function ( options ) {
	return new Gitlab( options );
};
