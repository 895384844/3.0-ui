define(
	function () {
		return ['$scope','HttpService','close', BlacklistEditCtrl];
		function BlacklistEditCtrl($scope, HttpService, close) {
			/*$scope.addBlacklist = {
				name : row.name,
				imei : row.imei,
				imsi : row.imsi
			};
		
			$scope.sure = function(){
		
				var obj = {
					id : row.id,
					name : $scope.addBlacklist.name,
					imei : $scope.addBlacklist.imei,
					imsi : $scope.addBlacklist.imsi,
					isblacklist : true
				};
		
				httpServices.promise('/query/TerminalAction!editTerminal.action',obj).then(function(resp){
					if(resp.data.status == 'success'){
						close(null,500);
					}else{
						alert('编辑失败！');
					}
				});
		    };*/
		
		    $scope.close = function(result) {
		 	    close(result, 500); 
		    };
		}
	});
