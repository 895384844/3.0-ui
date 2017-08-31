define(
	function () {
		return ['$scope', 'HttpService', 'close', BusUserEditCtrl];
		function BusUserEditCtrl($scope, HttpService, close) {
			/*$scope.person = { 
				name : row.peopleName,
				gender : row.sex,
				phone : row.contactTel,
				mail : row.email,
				type : row.status
			};		
			$scope.sure = function(){
				var obj = {
					id : row.id,
					peopleName : $scope.person.name,
					sex : $scope.person.gender,
					contactTel : $scope.person.phone,
					Email : $scope.person.mail,
					status : $scope.person.type,
				};
				HttpService.promise('/query/PeopleAction!editPeople.action',obj).then(function(resp){
		            if (resp.data.status == 'success') {
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
