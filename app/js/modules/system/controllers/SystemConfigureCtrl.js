define(function() {
	return ['$scope', 'i18nService', '$lt', '$filter', 'GridService', 'ModalService', '$element', 'localSession', 'HttpService', 'DialogService', 'SystemService', SystemConfigureCtrl];

	function SystemConfigureCtrl($scope, i18nService, $lt, $filter, GridService, ModalService, $element, localSession, HttpService, DialogService, SystemService) {

		$scope.gridItemData = {};
		$scope.query = {};
		$scope.selectData = {};
		
		var offline = document.getElementById("offlineMap");
	    var online = document.getElementById("onlineMap");
	    var map_status = localStorage.getItem("isMapOffline");
	                                	               
        if(map_status == 'false'){
        	online.checked = true;
        	offline.checked = false;
        }else{
        	online.checked = false;
        	offline.checked = true;
        }
		
		var emptyInputs = document.getElementsByClassName("empty-input");
   		for(var i=0; i<emptyInputs.length; i++){
   			emptyInputs[i].onclick = function(){
   				$(this).prev().val("")
   			}
   		}

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
			return HttpService.post('device', filter);
		};

		var add = function() {
			ModalService.showModal({
				templateUrl: 'system/templates/configure_form.html',
				controller: 'SystemConfigureFormCtrl',
				inputs: {
					title: '新增模板',
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
		var using = function() {
			var selection = $scope.gridApi.selection.getSelectedRows();
		        if( selection.length == 0){
		            DialogService.showConfirm(
		                '提示',
		                '至少选择一条进行操作！',null)
					return;
		        }
		};
		var edit = function () {
    		var selection = $scope.gridApi.selection.getSelectedRows();
		        if( selection == null || selection.length != 1){
		            DialogService.showConfirm(
		                '提示',
		                '请选择一条进行操作！',null)
					return;
		        }else{
					ModalService.showModal({
	                    templateUrl: 'system/templates/configure_edit.html',
	                    controller: 'SystemConfigureEditCtrl',
	                    inputs:{
	                        title:'编辑模板',
	                        userInfo:{}
	                    }
	                }).then(function(modal) {
	                    modal.close.then(function(result) {
	                           GridService.refresh($scope);
	                    });
	                });
	           }
			};

		GridService.create($scope, {
			fetchData: true,
			columnDefs: [
			{ field: 'type',displayName: '模板类型' },
	        { field: 'templateName',displayName: '模板名称' },
	        { field: 'templateString',displayName: '模板样式' },
	//      { field: 'defaultUsed',displayName: '是否为缺省模版 ' },
	        { field: 'used',displayName: '是否启用' }
			],
			btnTools: [{
				css: 'fa fa-fw fa-refresh',
				tooltip: '刷新',
				method: function() {
					GridService.refresh($scope);
				}
			}, {
				css: 'fa fa-fw fa-plus-circle',
				tooltip: '添加',
				method: add
			}, 
			{
		    	css:'fa fa-fw fa-pencil',
		    	tooltip:'编辑',
		    	method:edit
		    },
		    {
		    	css:'fa fa-fw fa-check',
		    	tooltip:'启用',
		    	method:using
		    },
		    {
				css: 'fa fa-fw fa-minus-circle',
				tooltip: '删除',
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