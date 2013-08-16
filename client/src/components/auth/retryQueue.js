angular.module('auth.retryQueue', [])
.factory('authRetryQueue', [ '$injector', function ( $injector ) {
	// Store all requests for later execution.
	var queue = [],
		$http;

	// Retry a HTTP request.
	var retry = function ( request ) {
		// Init server to circumvent circular dependency.
		$http = $http || injector.get('$http');
		$http(request.config).then(

			function success( response ) {
				request.deferred.resolve(reponse);
			},

			function error ( reponse ) {
				request.deferred.reject(reponse);
			}
		);
	};

	var service = {
		isEmpty: function () {
			return queue.length === 0;
		},

		// Push a new HTTP request to the queue.
		push: function ( config, deferred ) {
			queue.push({ config: config, deferred: deferred });
		},

		// Retry all HTTP requests from queue.
		retryAll: function () {
			while( !service.isEmpty() ) {
				retry(queue.shift());
			}
		}
	};
	return service;
}]);
