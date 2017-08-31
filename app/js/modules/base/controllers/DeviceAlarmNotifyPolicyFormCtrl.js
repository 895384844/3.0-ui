define(
	function() {
		return ['$scope', 'HttpService', 'title', 'userInfo', 'close', 'GridService', DeviceAlarmNotifyPolicyFormCtrl];

		function DeviceAlarmNotifyPolicyFormCtrl($scope, HttpService, title, userInfo, close, GridService) {

			$scope.userInfo = angular.copy(userInfo);
			$scope.title = title;

			$scope.reset = function() {
				$scope.userInfo = angular.copy(userInfo);
			};

			$scope.selDevice = {
				show: false
			};
			$scope.selPeople = {
				show: false
			};

			$scope.deviceShow = function() {
				$scope.selDevice.show = true;
				$scope.selPeople.show = false;
			};
			$scope.peopleShow = function() {
				$scope.selDevice.show = false;
				$scope.selPeople.show = true;
			};

			$scope.close = close;

			$scope.togglePassword = function(id, span) {
				var pwd = $('#' + id);
				if(pwd.attr('type') == 'password') {
					pwd.attr('type', 'text');
					span.target.textContent = '~#_#';
				} else {
					pwd.attr('type', 'password');
					span.target.textContent = '~0_0';
				}
			};

			$scope.gridOptions_device = {
		        paginationPageSizes: [10, 20, 30],
		        paginationPageSize: 10,
		        useExternalPagination: true,
		        multiSelect: false,
		        rowHeight : 35,
		        columnDefs : [
		            { field: 'identity',displayName: '标识',maxWidth:300,minWidth:100 },
		            { field: 'name',displayName: '设备名称',maxWidth:300,minWidth:100 },
		            { field: 'number',displayName: '设备编号',maxWidth:300,minWidth:100 },
		            { field: 'address',displayName: '设备地址',maxWidth:300,minWidth:100 },
		            { field: 'memo',displayName: '备注',maxWidth:300,minWidth:100 }
		        ]
		    };
		    
		    $scope.gridOptions_people = {
		        paginationPageSizes: [10, 20, 30],
		        paginationPageSize: 10,
		        useExternalPagination: true,
		        multiSelect: true,
		        rowHeight : 35,
		        columnDefs : [
		            { field: 'id',displayName: '标识',maxWidth:250,minWidth:100 },
		            { field: 'peopleName',displayName: '人员名称',maxWidth:250,minWidth:100 },
		            { field: 'sex',displayName: '人员性别',maxWidth:250,minWidth:100 },
		            { field: 'contactTel',displayName: '手机号码',maxWidth:250,minWidth:100 },
		            { field: 'email',displayName: 'Email',maxWidth:250,minWidth:100},
		            { field: 'status',displayName: '身份',maxWidth:250,minWidth:100 }
		        ]
		    };	

		}
	});