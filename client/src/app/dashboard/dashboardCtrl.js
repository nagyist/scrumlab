angular.module( 'scrumlab.dashboard', [
	'security.authorization',
	'gitlab.resource.project'
])

// Routes
// -------------------------
.config([ '$routeProvider', 'securityAuthorizationProvider', function ( $routeProvider, auth ) {
	$routeProvider
		.when( '/dashboard', {
			title: 'Dashboard',
			controller: 'DashboardCtrl',
			templateUrl: 'dashboard/dashboard.tpl.html',
			resolve: {
				projects: function( $q, Project ) {
					var d = $q.defer();
					Project.query(function( projects ) {
						d.resolve( projects );
					});
					return d.promise;
				}
			}
		});
}])

.controller( 'DashboardCtrl', [ '$scope', 'projects' , function ( $scope, projects ) {



}]);
