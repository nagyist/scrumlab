angular.module('scrumlab.resouce.project', ['ngResource'])
.factory( 'Project', [ '$resource', function ( $resource ) {
	var Project = $resource('/api/projects/:id', { id: '@id' });
	return Project;
}]);
