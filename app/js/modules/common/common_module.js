define([
	'angular',
	'./controllers/DialogBoxCtrl',

	'./directives/buttonSet',
	'./directives/pattern',
	'./directives/fastclick',
	'./directives/parseInt',
	'./directives/filterSuggest',
	'./directives/dateTimeSelector',
	'./directives/permissionTag',
	'./directives/compareTo',
	'./directives/ignoreEmptyValue',
	'./directives/validate',
	'./directives/dynamicHeight',
	'./directives/baiduMap',

	'./services/DialogService',
	'./services/AlertService',
	'./services/HttpService',
	'./services/LocaleService',
	'./services/GridService',
	'./services/mapServices',
	'./services/utilityServices',

	'./filters/join',
	'./filters/numberPlus'
], function (angular,
             DialogBoxCtrl,
             buttonSet,
             myxPattern,
             fastclick,
             myxParseInt,
             filterSuggest,
             dateTimeSelector,
             permissionTag,
             compareTo,
             ignoreEmptyValue,
             validate,
             dynamicHeight,
             baiduMap,

             DialogService,
             AlertService,
             HttpService,
             LocaleService,
             GridService,
             mapServices,
             utilityServices,

             join,
             numberPlus) {
	var module = angular.module('webApp.common', []);

	module.factory({
		AlertService: AlertService,
		HttpService: HttpService,
		$lt: LocaleService,
		GridService: GridService,
		DialogService: DialogService,
		mapServices: mapServices,
		utilityServices: utilityServices
	});

	module.directive({
		buttonSet: buttonSet,
		myxPattern: myxPattern,
		myxFastClick: fastclick,
		myxParseInt: myxParseInt,
		filterSuggest: filterSuggest,
		dateTimeSelector: dateTimeSelector,
		permissionTag: permissionTag,
		compareTo: compareTo,
		ignoreEmptyValue: ignoreEmptyValue,
		validate: validate,
		dynamicHeight:dynamicHeight,
		baiduMap:baiduMap
	});
	module.filter({
		join: join,
		numberPlus: numberPlus
	});

	module.controller({
		DialogBoxCtrl: DialogBoxCtrl
	});

});