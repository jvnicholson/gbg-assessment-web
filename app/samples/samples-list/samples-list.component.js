(function () {
	'use strict';

	angular.module('gbg')
		.component('samplesList', {
			templateUrl: 'app/samples/samples-list/samples-list.component.html',
			controller: SamplesListComponentController
		});

	/* @ngInject */
	function SamplesListComponentController(samplesService) {
		var ctrl = this;

		// Properties
		ctrl.filter = "";

		// Methods

		// Init
		init();

		// Helpers

		function init() {
			ctrl.samples = samplesService.samples.query();
		}
	}
})();
