angular.module( 'scrumlab.dashboard', [] )

// Routes
// -------------------------
.config([ '$routeProvider', function ( $routeProvider ) {
	$routeProvider
		.when( '/', {
			title: 'Dashboard',
			controller: 'DashboardCtrl',
			templateUrl: 'dashboard/dashboard.tpl.html'
		});
}])

.controller( 'DashboardCtrl', [ '$scope', function ( $scope ) {



}]);
