define(
	function () {
		return ['$scope', 'HttpService', 'title','userInfo','close', DeviceListFormCtrl];
		function DeviceListFormCtrl($scope, HttpService,title, userInfo,close) {

			$scope.close=close;


		}
	});
