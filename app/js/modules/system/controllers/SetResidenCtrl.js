define(
function() {
	return ['$scope', 'HttpService', SetResidenCtrl];

	function SetResidenCtrl($scope, HttpService) {		
		$scope.sureResult = function(){
			var filter={};
            if($scope.query){
            	filter.mapQuery = angular.copy($scope.query);
            }
            HttpService.post('map',filter);
		}
	}
})
