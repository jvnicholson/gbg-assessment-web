(function () {
	'use strict';

	angular.module('gbg')
		.factory('samplesService', SamplesService);

	function SamplesService($resource, API_URL) {
		return {
			samples: $resource(API_URL + '/samples:id')
		};
	}
})();