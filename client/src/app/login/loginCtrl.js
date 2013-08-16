angular.module( 'scrumlab.login', [] )

// Routes
// -------------------------
.config([ '$routeProvider', function ( $routeProvider ) {
	$routeProvider
		.when( '/login', {
			title: 'Login',
			controller: 'LoginCtrl',
			templateUrl: 'login/login.tpl.html'
		});
}])

.controller( 'LoginCtrl', [ '$scope', function ( $scope ) {

}]);
