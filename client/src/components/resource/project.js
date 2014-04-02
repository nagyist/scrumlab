angular.module('scrumlab.resouce.project', ['ngResource'])
.factory( 'Project', [ '$resource', function ( $resource ) {
	var Project = $resource('/api/projects/:id', { id: '@id' });

	console.log("this is a change");

	return Project;
}]);
