(function () {
	'use strict';

	angular.module('gbg')
		.factory('statusesService', StatusesService);

	function StatusesService($resource, API_URL) {
		return {
			statuses: $resource(API_URL + '/statuses:id')
		};
	}
})();