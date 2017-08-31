define(function() {
	return ['$scope', 'i18nService', '$lt', '$filter', 'GridService', 'ModalService', '$element', 'localSession', 'HttpService', 'DialogService', 'SystemService', SystemLicenseCtrl];

	function SystemLicenseCtrl($scope, i18nService, $lt, $filter, GridService, ModalService, $element, localSession, HttpService, DialogService, SystemService) {

		$scope.gridItemData = {};
		$scope.query = {};
		$scope.selectData = {};

		$scope.getPagingList = function(currentPage, pageSize, sort) {
			var filter = {
				page_size: pageSize,
				page_no: currentPage - 1
			};
			if($scope.search) {
				angular.extend(filter, $scope.search);
			}
			if(!!sort) {
				//filter.sort=sort;
			}
			return HttpService.post('warning/warning_blacklist/get', filter);
		};

		var add = function() {
			ModalService.showModal({
				templateUrl: 'system/templates/user_form.html',
				controller: 'SystemUserEditCtrl',
				inputs: {
					title: '新建用户',
					userInfo: {}
				}
			}).then(function(modal) {
				modal.close.then(function(result) {
					GridService.refresh($scope);
				});
			});
		};
		var remove = function() {
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
		};
		$scope.imports = function(){
	        ModalService.showModal({
	            templateUrl: 'device/templates/license_import.html',
	            controller: 'SystemLicenseImportCtrl'
	        }).then(function(modal) {
				modal.close.then(function(result) {
					GridService.refresh($scope);
			});/*.then(function(modal) {
	            modal.element.modal();
	            modal.close.then(function() {
	                $scope.promise = gridServices.promiseDefault('/device/deviceAction!getScopeDevice.action');
	                $scope.getPage($scope.promise);
	            });*/
	        });
	    };

		GridService.create($scope, {
			fetchData: true,
			columnDefs: [
			{ field: 'id',displayName: 'ID' },
	        { field: 'username',displayName: '用户名' },
	        { field: 'from_time',displayName: '时间从' },
	        { field: 'to_time',displayName: '时间到' },
	        { field: 'device_count',displayName: '设备数量' },
	        { field: 'hwid',displayName:'硬件信息'},
	        { field: 'signature',displayName: '密钥' },
	        { field: 'update_time',displayName: '导入日期' }
			],
//			btnTools: [{
//				css: 'fa fa-fw fa-refresh',
//				tooltip: '刷新',
//				method: function() {
//					GridService.refresh($scope);
//				}
//			}, {
//				css: 'fa fa-fw fa-plus-circle',
//				tooltip: '添加',
//				method: add
//			}, {
//				css: 'fa fa-fw fa-minus-circle',
//				tooltip: '删除',
//				method: remove
//			}]

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