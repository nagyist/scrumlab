angular.module('auth.form.ctrl', [])
.controller('authFormCtrl', [ '$http', function ( $http ) {
	this.login = function () {
		console.log('login started');
		var request = $http.post('/api/login', {email: this.email, password: this.password},

			function success ( response ) {
				console.log(response);
			},

			function error ( response ) {
				console.log(response);
			}
		);

		request.then( function ( response ) {
			console.log(response);
		});
	};
}]);
