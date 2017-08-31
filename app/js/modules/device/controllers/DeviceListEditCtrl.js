define(
	function () {
		return ['$scope', 'HttpService', 'close', DeviceListEditCtrl];
		function DeviceListEditCtrl($scope, HttpService,close) {

			$scope.close=close;


		}
	});
