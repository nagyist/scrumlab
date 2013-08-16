angular.module('auth.form.ctrl', ['auth.session'])
.controller('authFormCtrl', [ '$http', '$session', function ( $http, $session ) {
	this.login = function () {
		console.log('login started');
		var request = $http.post('/api/login', {email: this.email, password: this.password});
		request.then(

			function success ( response ) {
				$session.login( response.data );
			},

			function error ( response ) {
				console.error(response);
			}
		);
	};
}]);
