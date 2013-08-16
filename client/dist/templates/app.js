angular.module('templates.app', ['dashboard/dashboard.tpl.html', 'login/login.tpl.html']);

angular.module("dashboard/dashboard.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/dashboard.tpl.html",
    "This is the dashboard.\n" +
    "<a ng-href=\"#!/dashboard\">Dashboard</a>\n" +
    "");
}]);

angular.module("login/login.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login/login.tpl.html",
    "This is the login page.\n" +
    "\n" +
    "<div ng-include=\"'auth/tpl/loginForm.tpl.html'\"></div>\n" +
    "\n" +
    "");
}]);
