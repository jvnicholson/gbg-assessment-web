(function () {
	'use strict';

	angular.module('gbg')
		.component('samplesList', {
			templateUrl: 'app/samples/samples-list/samples-list.component.html',
			controller: SamplesListComponentController
		});

	/* @ngInject */
	function SamplesListComponentController(samplesService, statusesService) {
		var ctrl = this,
			allSamples = [];

		// Properties
		ctrl.filter = {};

		// Methods
		ctrl.onFilterSelect = onFilterSelect;
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

		function filterByStatus(item) {
			if(item.statusId >= 0) {
				ctrl.samples = samplesService.samples.query({statusId: item.statusId});
			}
			else {
				ctrl.samples = allSamples;
			}
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
