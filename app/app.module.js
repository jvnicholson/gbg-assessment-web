(function () {
	'use strict';

	angular.module('gbg', ['ui.router', 'ngMaterial', 'ngResource'])
		.constant('API_URL', 'http://genebygeneapi20161027095600.azurewebsites.net/api');
})();