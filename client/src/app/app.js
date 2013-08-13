angular.module('scrumlab', [
	'session'
])


.config(['$routeProvider', '$locationProvider',
	function ( $routeProvider, $locationProvider ) {
		$locationProvider.hashPrefix('!');
		$routeProvider.otherwise( {redirectTo: '/404'} );
	}
])


.run(['$location', '$rootScope', function ( $location, $rootScope ) {
	$rootScope.$on('$routeChangeSuccess', function ( event, current, previous ) {
		$rootScope.title = current.$route.title;
	});
}])

.controller( 'AppCtrl', ['$scope', '$location',
	function ( $scope, $location ) {

}]);
