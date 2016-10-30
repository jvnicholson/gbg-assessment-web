(function() {
	'use strict';

	angular.module('gbg')
		.component('gbgApp', {
			templateUrl: 'app/app.component.html',
			controller: AppComponentController
		});

	function AppComponentController() {
		var ctrl = this;

		ctrl.title = "Welcome";
	}
})();