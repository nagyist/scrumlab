angular.module('scrumlab', [
	'ngRoute',

	'scrumlab.login',
	'scrumlab.dashboard',

	'templates.app',
	'templates.components'
])


.config(['$routeProvider', '$locationProvider',
	function ( $routeProvider, $locationProvider ) {
		$locationProvider.hashPrefix('!');
		$routeProvider.otherwise( {redirectTo: '/404'} );
	}
])


.run(['$location', '$rootScope', function ( $location, $rootScope ) {
	$rootScope.$on('$routeChangeSuccess', function ( event, current, previous ) {
		try {
			$rootScope.title = current.$$route.title;
		} catch (e) {
			$rootScope.title = 'Loading...';
		}
	});
}])

.controller( 'AppCtrl', ['$scope', '$location',
	function ( $scope, $location ) {

}]);
