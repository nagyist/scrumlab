angular.module('auth.session', [])
.service('$session', [ '$http', function ( $http ) {
	// Store current user.
	var user;

	var session = {

		// Login/ -out
		// -------------------------
		login: function ( u ) {
			user = u;
		},
		logout: function () {
			user = undefined;
		},
		// This will ask the backend if we are curently authenticated,
		// mabye from a previous visit.
		current: function () {
			return $http.get('/api/session').then( function ( response ) {
				session.login( reponse.data );
				return session.user();
			});
		},

		// User
		// -------------------------
		user: function () {
			return user || {};
		},


		// Helper functions
		// -------------------------
		isAuthenticated: function () {
			return !!user;
		}

	};
	return session;
}]);
