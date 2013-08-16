angular.module('auth.interceptor', [])

// Service to intercept authentication failures.
// If an authentiation failure occurs it will store the request in an queue
// and redirect the user to the login page.
.factory( 'authInterceptor', [ '$location', function ( $location ) {
	return function ( promise ) {
		// Intercept failed requests.
		return promise.then( null, function ( response ) {
			if( response.status === 401 ) {
				// TODO: add retry queue.
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
