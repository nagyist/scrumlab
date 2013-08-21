angular.module('auth.form.ctrl', ['auth.session'])
.controller('authFormCtrl', [ '$http', '$session', 'AuthRetryQueue', function ( $http, $session, queue ) {
	this.login = function () {
		var request = $http.post('/api/login', {email: this.email, password: this.password});
		request.then(
			function success ( response ) {
				$session.login( response.data );
				queue.retryAll();
			},
			function error ( response ) {
				// TODO: Login failed.
				console.error(response);
			}
		);
	};
}]);
