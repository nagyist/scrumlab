angular.module('gitlab.resource.project', ['ngResource'])
.factory( 'Project', ['$resource', function ( $resource ) {
	var Project = $resource('/api/projects/:id');
	return Project;
}]);
