define([
	'angular',
	'./controllers/AppCtrl',
	'./controllers/TabsCtrl',
	'./controllers/MapMainCtrl',
	'./controllers/HeaderCtrl',
	'./controllers/MenusCtrl',
	'./controllers/LicenseCtrl',
	'./controllers/HomepageCtrl',
	'./services/SectionsService',
	'./services/ChartsService'
], function (angular,
             AppCtrl,
             TabsCtrl,
             MapMainCtrl,
             HeaderCtrl,
             MenusCtrl,
             LicenseCtrl,
             HomepageCtrl,
             SectionsService,
             ChartsService
             ) {
	var module = angular.module('webApp.app', ['webApp.menu', 'webApp.config']);

	module.controller({
		AppCtrl: AppCtrl,
		TabsCtrl:TabsCtrl,
		MapMainCtrl: MapMainCtrl,
		HeaderCtrl: HeaderCtrl,
		MenusCtrl: MenusCtrl,
		LicenseCtrl: LicenseCtrl,
		HomepageCtrl: HomepageCtrl
	});

	module.factory({
		SectionsService: SectionsService,
		ChartsService:ChartsService
	});
});