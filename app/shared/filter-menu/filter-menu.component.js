(function() {
	'use strict';

	angular.module('gbg')
        .component('filterMenu', {
	        templateUrl: 'app/shared/filter-menu/filter-menu.component.html',
            controller: FilterMenuController,
            bindings: {
				doMenuReset: '<',
				idKey: '@',
                items: '<',
                label: '@',
                onItemSelect: '&',
                type: '@',
				valueKey: '@'
            }
        });

	function FilterMenuController($scope) {
		var ctrl = this;

		// Properties


		// Methods
        ctrl.openMenu = openMenu;
        ctrl.selectItem = selectItem;

		// Init
		init();

		// Helpers
		function init() {
		    var item = {id: -1, value: 'All'};

		    var unwatch = $scope.$watch(function() { return ctrl.items.length; }, function(newItemsLength) {
		        if(!newItemsLength) return;

                unwatch();
                normalizeItemProperties(ctrl.items);
                ctrl.items.unshift(item);
                ctrl.selectedItem = item;
            });
		}

		function normalizeItemProperties(items) {
			_.forEach(items, function(item) {
				item.id = item[ctrl.idKey];
				item.value = item[ctrl.valueKey];
			});
		}

        function openMenu($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        }

        function selectItem(item) {
            ctrl.selectedItem = item;
            ctrl.onItemSelect({ item: item, type: ctrl.type });
        }
	}
})();
