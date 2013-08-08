angular.module('sebald.gitlab', ['ng'])
.provider('$gitlab', function () {

	// Short hands.
	var extend = angular.extend;

	// Defaults.
	var defaults = {
		url: '',
		api: 'api/v3/'
	};

	// Globals (set via $provider).
	var globals = {};

	// Set globals.
	this.options = function ( value ) {
		globals = value;
	};


	// Service
	// -------------------------
	this.$get = ['$http',
	function ( $http ) {


		// API: User + Session
		// -------------------------
		function User () {

		}



		// API class
		// -------------------------
		function Api ( opts ) {
			var self = this,
				options = extend( {}, defaults, globals, opts );

		}

		// The actual $gitlab service that is injected in controllers.
		return {

		};
	}];

});
