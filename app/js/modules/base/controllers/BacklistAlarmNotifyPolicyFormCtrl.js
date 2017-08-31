define(
	function () {
		return ['$scope', 'HttpService', 'title','userInfo','close', BacklistAlarmNotifyPolicyFormCtrl];
		function BacklistAlarmNotifyPolicyFormCtrl($scope, HttpService,title, userInfo,close) {
			$scope.userInfo = angular.copy(userInfo);
			$scope.title = title;
			$scope.reset = function () {
				$scope.userInfo = angular.copy(userInfo);				
			};
			$scope.selTerminal = { show : false };
			$scope.selPeople = { show : false };
		
			$scope.terminaShow = function(){
				$scope.selTerminal.show = true;
				$scope.selPeople.show = false;
			};
			$scope.peopleShow = function(){
				$scope.selTerminal.show = false;
				$scope.selPeople.show = true;
			};

			$scope.close=close;

			$scope.togglePassword = function (id, span) {
				var pwd = $('#' + id);
				if (pwd.attr('type') == 'password') {
					pwd.attr('type', 'text');
					span.target.textContent = '~#_#';
				} else {
					pwd.attr('type', 'password');
					span.target.textContent = '~0_0';
				}
			};

		    $scope.gridOptions_terminal = {
		        paginationPageSizes: [10, 20, 30],
		        paginationPageSize: 10,
		        useExternalPagination: true,
		        multiSelect: false,
		        rowHeight : 35,
		        columnDefs : [
		            { field: 'name',displayName: '姓名',maxWidth:300,minWidth:200 },
		            { field: 'imsi',displayName: 'IMSI',maxWidth:300,minWidth:200 },
		            { field: 'imei',displayName: 'IMEI',maxWidth:300,minWidth:200 }
		        ]
		    };
		    
		    $scope.gridOptions_people = {
		        paginationPageSizes: [10, 20, 30],
		        paginationPageSize: 10,
		        useExternalPagination: true,
		        multiSelect: true,
		        rowHeight : 35,
		        columnDefs : [
		            { field: 'peopleName',displayName: '名称',maxWidth:250,minWidth:150 },
		            { field: 'sex',displayName: '性别',maxWidth:250,minWidth:150 },
		            { field: 'contactTel',displayName: '手机号码',maxWidth:250,minWidth:150 },
		            { field: 'status',displayName: '身份',maxWidth:250,minWidth:150 }
		        ]
		    };	

		}
	});
