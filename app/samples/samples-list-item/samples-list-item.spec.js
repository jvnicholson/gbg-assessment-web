describe('component: samplesListItem', function () {
	var $componentController;

	beforeEach(module('gbg'));
	beforeEach(inject(function (_$componentController_) {
		$componentController = _$componentController_;
	}));

	it('should compose `className` and `createdBy` properties', function () {
		// Here we are passing actual bindings to the component
		var bindings = {
			item: {
				status: 'In Lab',
				createdByFirstName: 'Josh',
				createdByLastName: 'Nicholson'
			}
		};
		var ctrl = $componentController('samplesListItem', null, bindings);

		expect(ctrl.item).toBeDefined();
		expect(ctrl.item.className).toBe('in-lab');
		expect(ctrl.item.createdBy).toBe('Josh Nicholson');
	});
});