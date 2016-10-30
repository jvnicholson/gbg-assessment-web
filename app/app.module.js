(function () {
	'use strict';

	angular.module('gbg', ['ui.router', 'ngMaterial', 'ngResource'])
		.constant('API_URL', 'http://gbg-assessment-jvn-api.azurewebsites.net/api');
})();