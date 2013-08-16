angular.module('templates.components', ['auth/tpl/loginForm.tpl.html']);

angular.module("auth/tpl/loginForm.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/tpl/loginForm.tpl.html",
    "<form name=\"loginForm\" class=\"login-container\" ng-controller=\"authFormCtrl as auth\">\n" +
    "	<input name=\"email\" type=\"email\" ng-model=\"auth.email\" required>\n" +
    "	<input name=\"password\" type=\"password\" ng-model=\"auth.password\" required>\n" +
    "	<button ng-click=\"auth.login()\" ng-disabled=\"loginForm.$invalid\">Login</button>\n" +
    "</form>\n" +
    "");
}]);
