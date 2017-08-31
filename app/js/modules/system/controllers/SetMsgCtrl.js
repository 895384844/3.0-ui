define(
function() {
	return ['$scope', 'HttpService', SetMsgCtrl];

	function SetMsgCtrl($scope, HttpService) {		
		$scope.sureMsg = function(){
			alert(1)
		}
	}
})
