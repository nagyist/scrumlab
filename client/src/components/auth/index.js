// Based on the work by Witold Szczerba (https://github.com/witoldsz/angular-http-auth)
angular.module('auth', [
	'auth.interceptor',
	'auth.retryQueue',
	'auth.form.ctrl'
]);
