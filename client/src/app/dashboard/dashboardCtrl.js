angular.module( 'scrumlab.dashboard', [
	'scrumlab.resouce.project'
])

// Routes
// -------------------------
.config([ '$routeProvider',  function ( $routeProvider ) {
	$routeProvider
		.when( '/dashboard', {
			title: 'Dashboard',
			controller: 'DashboardCtrl',
			templateUrl: 'dashboard/dashboard.tpl.html',
			resolve: {
				projects: function ( Project ) {
					return Project.query().$promise;
				}
			}
		})
		.when( '/', {
			redirectTo: '/dashboard'
		});
}])

.controller( 'DashboardCtrl', [ '$scope', function ( $scope ) {



}]);
