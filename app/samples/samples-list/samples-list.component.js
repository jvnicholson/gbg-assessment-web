(function () {
	'use strict';

	angular.module('gbg')
		.component('samplesList', {
			templateUrl: 'app/samples/samples-list/samples-list.component.html',
			controller: SamplesListComponentController
		});

	/* @ngInject */
	function SamplesListComponentController($mdDialog, samplesService, statusesService) {
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
			allSamples = samplesService.samples.query();
			ctrl.samples = allSamples;
			ctrl.sortItems = createSortItems();
			ctrl.currentSortItem = ctrl.sortItems[0];
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

		function onKeyUp(e) {
			if (e.keyCode === 13)
				fetchFilteredResults();
		}

		function showAddDialog(ev) {
			$mdDialog.show({
				controller: 'SamplesDialogController',
				templateUrl: 'app/samples/samples-dialog/samples-dialog.tmpl.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true
			}).then(function (data) {
				console.log(data);
			}, function () {
				console.log("cancel");
			});
		}

		function sortList(newSort) {
			// clicking the same sort, then toggle ascending/descending
			if (ctrl.currentSortItem && newSort.value === ctrl.currentSortItem.value) {
				newSort.isDescending = !newSort.isDescending;
			}

			ctrl.currentSortItem = newSort;
			ctrl.samples = _.orderBy(ctrl.samples, [ctrl.currentSortItem.value], [ctrl.currentSortItem.isDescending ? 'desc' : 'asc']);
		}
	}
})();
