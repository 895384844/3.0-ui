define([
	'angular',
	'./controllers/DeviceListCtrl',
	'./controllers/DeviceListFormCtrl',
	'./controllers/DeviceListEditCtrl',
	'./controllers/RestartCaptureCtrl',
	'./controllers/CloseCaptureCtrl',
	'./controllers/CatchPointCtrl',
	'./controllers/RestartSystemCtrl',
	'./controllers/SameClockCtrl',
	'./controllers/DeviceImportCtrl'
], function (angular,
             DeviceListCtrl,
			 DeviceListFormCtrl,
			 DeviceListEditCtrl,
			 RestartCaptureCtrl,
			 CloseCaptureCtrl,
			 CatchPointCtrl,
			 RestartSystemCtrl,
			 SameClockCtrl,
			 DeviceImportCtrl) {

	var module = angular.module('webApp.device', []);

	module.controller({
		DeviceListCtrl: DeviceListCtrl,
		DeviceListFormCtrl: DeviceListFormCtrl,
		DeviceListEditCtrl: DeviceListEditCtrl,
		RestartCaptureCtrl: RestartCaptureCtrl,
		CloseCaptureCtrl: CloseCaptureCtrl,
		CatchPointCtrl: CatchPointCtrl,
		RestartSystemCtrl: RestartSystemCtrl,
		SameClockCtrl: SameClockCtrl,
		DeviceImportCtrl: DeviceImportCtrl
	});

});