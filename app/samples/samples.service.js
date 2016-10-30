(function () {
	'use strict';

	angular.module('gbg')
		.factory('samplesService', SamplesService);

	function SamplesService($q, $resource, API_URL) {
		return {
			samples: $resource(API_URL + '/samples:id')
		};

		function getSamples() {
			var deferred = $q.defer(),
				samples = [
					{
						sampleId: 1,
						barcode: '129076',
						createdAt: '2015-01-02',
						createdBy: 6,
						statusId: 3
					},
					{
						sampleId: 2,
						barcode: '850314',
						createdAt: '2015-06-15',
						createdBy: 7,
						statusId: 3
					}
				];

			deferred.resolve({data: samples});

			return deferred.promise;
		}
	}
})();