angular.module('auth.interceptor', ['auth.retryQueue'])

// Service to intercept authentication failures.
// If an authentiation failure occurs it will store the request in an queue
// and redirect the user to the login page.
.factory( 'authInterceptor', [ '$q', '$location', 'authRetryQueue', function ( $q, $location, queue ) {
	return function ( promise ) {
		// Intercept failed requests.
		return promise.then( null, function ( response ) {
			if( response.status === 401 ) {
				var deferred = $q.defer();
				queue.push( response.config, deferred );
				// Redirect to login page.
				$location.path('/login');
			}
			// Otherwise, ignore it.
			return promise;
		});
	};
}])

// Add the authInterceptor to Angular's response interceptors.
.config(['$httpProvider', function ( $httpProvider ) {
	$httpProvider.responseInterceptors.push( 'authInterceptor' );
}]);
