(function () {
	'use strict';

	angular.module('gbg')
		.component('samplesList', {
			templateUrl: 'app/samples/samples-list/samples-list.component.html',
			controller: SamplesListComponentController
		});

	/* @ngInject */
	function SamplesListComponentController($mdDialog, $mdToast, samplesService, statusesService, usersService) {
		var ctrl = this,
			allSamples = [];

		// Properties
		ctrl.filter = {};

		// Methods
		ctrl.fetchFilteredResults = fetchFilteredResults;
		ctrl.onFilterSelect = onFilterSelect;
		ctrl.onKeyUp = onKeyUp;
		ctrl.showAddDialog = showAddDialog;
		ctrl.sortList = sortList;

		// Init
		init();

		// Helpers
		function init() {
			ctrl.statuses = statusesService.statuses.query();
			ctrl.users = usersService.users.query();
			ctrl.sortItems = createSortItems();
			ctrl.currentSortItem = ctrl.sortItems[0];
			fetchAll();
		}

		function createSortItems() {
			return [
				{
					isDescending: false,
					label: 'ID',
					value: 'sampleId'
				},
				{
					isDescending: false,
					label: 'Barcode',
					value: 'barcode'
				},
				{
					isDescending: false,
					label: 'Created At',
					value: 'createdAt'
				},
				{
					isDescending: false,
					label: 'Created By',
					value: 'createdBy'
				},
				{
					isDescending: false,
					label: 'Status',
					value: 'status'
				}
			];
		}

		function displayError(msg) {
			console.log(msg);
			$mdToast.show(
				$mdToast.simple()
					.textContent(msg)
					.position('top right')
					.hideDelay(3000)
			);
		}

		function displaySuccess(msg) {
			$mdToast.show(
				$mdToast.simple()
					.textContent(msg)
					.position('top right')
					.hideDelay(3000)
			);
		}

		function fetchAll() {
			allSamples = samplesService.samples.query();
			ctrl.samples = allSamples;
		}

		function fetchFilteredResults() {
			var queryParams = {createdBy: ctrl.searchTerm};

			if (ctrl.selectedStatusId >= 0) {
				queryParams.statusId = ctrl.selectedStatusId;
			}

			ctrl.samples = samplesService.samples.query(queryParams);
		}

		function filterByStatus(item) {
			ctrl.selectedStatusId = item.statusId;
			fetchFilteredResults();
		}

		function onFilterSelect(item, type) {
			switch (type) {
				case "status":
					filterByStatus(item);
					break;
				default:
					break;
			}
		}

		function onSaveError(err) {
			var msg = err.statusText;
			if(err.data && err.data.message)
				msg += ": " + err.data.message;

			displayError(msg);
		}

		function onSaveSuccess(sample) {
			if (sample.sampleId !== 0) {
				displaySuccess("Sample saved. Refreshing results.");
				fetchAll();
			} else {
				displayError("There was a problem saving that Sample.");
			}
		}

		function onKeyUp(e) {
			if (e.keyCode === 13)
				fetchFilteredResults();
		}

		function showAddDialog(ev) {
			var validStatuses = ctrl.statuses.slice();

			validStatuses.shift();

			$mdDialog.show({
				bindToController: true,
				clickOutsideToClose: true,
				controller: 'SamplesDialogController',
				controllerAs: '$ctrl',
				locals: {
					statuses: validStatuses,
					users: ctrl.users
				},
				parent: angular.element(document.body),
				targetEvent: ev,
				templateUrl: 'app/samples/samples-dialog/samples-dialog.tmpl.html'
			}).then(function (data) {
				var Samples = new samplesService.samples(data);
				Samples.$save(onSaveSuccess, onSaveError);
			}, function () {
				console.log("cancel");
			});
		}

		function sortList(newSort) {
			// clicking the same column sort, so toggle ascending/descending
			if (ctrl.currentSortItem && newSort.value === ctrl.currentSortItem.value) {
				newSort.isDescending = !newSort.isDescending;
			}

			ctrl.currentSortItem = newSort;
			ctrl.samples = _.orderBy(ctrl.samples, [ctrl.currentSortItem.value], [ctrl.currentSortItem.isDescending ? 'desc' : 'asc']);
		}
	}
})();
