(function () {
	'use strict';

	angular.module('gbg')
		.factory('statusesService', StatusesService);

	function StatusesService($q, $resource, API_URL) {
		return {
			statuses: $resource(API_URL + '/statuses:id')
		};

		function getStatuses() {
			var deferred = $q.defer(),
				statuses = [
					{
						statusId: 0,
						status: 'Received'
					},
					{
						statusId: 1,
						status: 'Accessioning'
					},
					{
						statusId: 2,
						status: 'In Lab'
					},
					{
						statusId: 3,
						status: 'Report Generation'
					}
				];

			deferred.resolve({data: statuses});

			return deferred.promise;
		}
	}
})();