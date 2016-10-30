(function () {
	'use strict';

	angular.module('gbg')
		.component('samplesListItem',
			{
				templateUrl: 'app/samples/samples-list-item/samples-list-item.component.html',
				controller: SamplesListItemComponentController,
				bindings: {
					item: '<'
				}
			});

	function SamplesListItemComponentController() {
		var ctrl = this;

		// Properties


		// Methods


		// Init
		init();

		// Helpers
		function init() {
			ctrl.item.className = ctrl.item.status.toLowerCase().split(' ').join('-');
			ctrl.item.createdBy = ctrl.item.createdByFirstName + " " + ctrl.item.createdByLastName;
		}
	}
})();
