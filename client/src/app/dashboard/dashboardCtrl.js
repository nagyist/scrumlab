angular.module( 'scrumlab.dashboard', [])

// Routes
// -------------------------
.config([ '$routeProvider',  function ( $routeProvider ) {
	$routeProvider
		.when( '/dashboard', {
			title: 'Dashboard',
			controller: 'DashboardCtrl',
			templateUrl: 'dashboard/dashboard.tpl.html',
			resolve: {

			}
		})
		.when( '/', {
			redirectTo: '/dashboard'
		});
}])

.controller( 'DashboardCtrl', [ '$scope', function ( $scope ) {



}]);
