(function () {
	'use strict';

	angular.module('gbg')
		.factory('usersService', UsersService);

	function UsersService($resource, API_URL) {
		return {
			users: $resource(API_URL + '/users:id')
		};
	}
})();