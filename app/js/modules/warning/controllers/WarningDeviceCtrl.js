define(function() {
	return ['$scope', 'i18nService', '$lt', '$filter', 'GridService', 'ModalService', '$element', 'localSession', 'HttpService', 'DialogService', 'SystemService', WarningDeviceCtrl];

	function WarningDeviceCtrl($scope, i18nService, $lt, $filter, GridService, ModalService, $element, localSession, HttpService, DialogService, SystemService) {

		$scope.query = {};
		$scope.gridItemData = {};
		$scope.deviceAlarm = {};
		$scope.selectData = {};
		
		$scope.isActive = true;
		$scope.isShow = true;
		
		var inputLen = document.getElementsByClassName("toogle-input").length;
		var winWid = window.outerWidth;
		
		if(winWid < 1024 && inputLen > 3){
			$scope.isShow = true;
		}else if((winWid <= 1024 && winWid < 1280) && inputLen > 3){
			$scope.isShow = true;
		}else if((winWid >= 1280 || winWid <=1366) && inputLen > 4){
			$scope.isShow = true;
		}else if(winWid >= 1920 && inputLen > 6){
			$scope.isShow = true;
		}else{
			$scope.isShow = false;
		}
		
		$scope.toogleH = function(){			
			$scope.isActive = !$scope.isActive;
		}

		$scope.getPagingList = function(currentPage, pageSize, sort) {
			var filter={page_size:pageSize,page_no:currentPage-1};
            if($scope.query){
            	filter.query = angular.copy($scope.query);
            }
            if($scope.search){
                angular.extend(filter,$scope.search);
            }
            if(!!sort){
            	filter.order_by=sort;
            }
           return HttpService.get('device',filter);
		};

		var add = function() {
			ModalService.showModal({
				templateUrl: 'warning/templates/warning_device_form.html',
				controller: 'WarningDeviceEditCtrl',
				inputs: {
					title: '添加意见',
					userInfo: {}
				}
			}).then(function(modal) {
				modal.close.then(function(result) {
					GridService.refresh($scope);
				});
			});
		};
		var remove = function() {
			var selection = $scope.gridApi.selection.getSelectedRows();
		        if( selection.length == 0){
		            DialogService.showConfirm(
		                '提示',
		                '至少选择一条进行操作！',null)
					return;
		        }else{
					DialogService.showConfirm(
						'确认信息',
						'确定要删除吗？',
						function() {
							ids = [];
							selection = $scope.gridApi.selection.getSelectedRows();
							for(var i in selection) {
								ids.push(selection[i].id);
							}
							HttpService.remove('users/', {
									ids: ids
								}).then(function success(data) {
										GridService.refresh($scope);
									},
									function failure(errorResponse) {
		
									})
								.finally(function() {
		
								});
						}, null);
				}
		};

		GridService.create($scope, {
			fetchData: true,
			columnDefs: [
			{ field: 'deviceName',displayName: '告警设备名称' },
	        { field: 'alarmLevel',displayName: '告警级别' },
	        { field: 'alarmCause',displayName: '告警原因' },
	        { field: 'date',displayName: '告警时间' }
			],
			btnTools: [
				{
					css: 'fa fa-fw fa-refresh',
					tooltip: '刷新',
					method: function() {
						GridService.refresh($scope);
					}
				}, 
				{
					css: 'fa fa-fw fa-minus-circle',
					tooltip: '删除',
					method: remove
				},
				{
					css: 'fa fa-fw fa-share-square-o',
					tooltip: '导出',
					method: remove
				},
				{
					css: 'fa fa-fw fa-download',
					tooltip: '下载',
					method: remove
				}]

		});
		$scope.export = function() {
			var filter = {
				"fields": [
					"name",
					"id"
				]
			};
			HttpService.download('action/group/exportxml', filter);
		};

		$scope.edit = function() {
			var selection = $scope.gridapi.getSelectedRows();
			if(selection.length <= 0) {
				$scope.showNoItemDialog(
					$lt('提示'),
					$lt('请选择需要编辑的选项')
				);
				return;
			}

			if(selection.length > 1) {
				$scope.showNoItemDialog(
					$lt('提示'),
					$lt('最多选择一项')
				);
				return;
			}
			var rid = selection[0];
			$scope.selectData = $scope.gridapi.getSelectedData(rid);
			$scope.getgridData = $scope.gridapi.getgridData();
			var dataArray = $scope.getgridData.items;
			$.each(dataArray, function(n, data) {
				if($scope.selectData.id == data.id) {
					$scope.gridItemData = data;
					$scope.gridItemData.confirm = $scope.gridItemData.password;
				}
			});
			//$scope.gridItemData.isEdit = 'true';
			OverlayService.show({
				title: $lt('编辑用户信息'),
				template: 'js/modules/warning/templates/warning_blacklist_form.html',
				scope: $scope
			});
		};

		$scope.search = function() {
			GridService.refresh($scope);
		};

	}
});