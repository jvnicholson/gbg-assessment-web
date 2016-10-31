(function () {
	'use strict';

	angular.module('gbg')
		.controller('SamplesDialogController', SamplesDialogController);

	function SamplesDialogController($mdDialog, $scope) {
		// Properties


		// Methods
		$scope.cancel = cancel;
		$scope.data = {};
		$scope.save = save;


		// Helpers
		function cancel() {
			$mdDialog.cancel();
		}

		function save() {
			$mdDialog.hide("save the data");
		}

	}
})();
