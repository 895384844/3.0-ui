define(
function() {
	return ['$scope', 'HttpService', SetMapCtrl];

	function SetMapCtrl($scope, HttpService) {		
		$scope.sureMap = function(){
			alert(2)
		}
	}
})
