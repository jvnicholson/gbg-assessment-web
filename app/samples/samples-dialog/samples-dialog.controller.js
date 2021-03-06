(function () {
	'use strict';

	angular.module('gbg')
		.controller('SamplesDialogController', SamplesDialogController);

	function SamplesDialogController($mdDialog) {
		// Properties
		var ctrl = this;


		// Methods
		ctrl.cancel = cancel;
		ctrl.data = { createdById: 0, statusId: 0 };
		ctrl.save = save;


		// Helpers
		function cancel() {
			$mdDialog.cancel();
		}

		function save() {
			$mdDialog.hide(ctrl.data);
		}
	}
})();
