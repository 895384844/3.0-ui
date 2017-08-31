/**
 * Created by zhaoyang on 16/7/25.
 */
define(['moment'], function(moment) {
	return ['$scope', 'AlertService', 'HttpService', 'GridService', 'DialogService', 'ModalService', DeviceListCtrl];

	function DeviceListCtrl($scope, AlertService, HttpService, GridService, DialogService, ModalService) {
		$scope.query = {};
		$scope.isActive = true;
		$scope.isShow = false;
		
		var inputLen = document.getElementsByClassName("toogle-input").length;
		
		onWinResize();
		
		function onWinResize(){
			var winWid = window.outerWidth;
			if(winWid < 1034 && inputLen > 3){
				$scope.isShow = true;
			}else if(inputLen > 3 && (winWid <= 1024 && winWid < 1280)){
				$scope.isShow = true;
			}else if(inputLen > 4 && (winWid >= 1270 || winWid < 1376)){
				$scope.isShow = true;
			}else if(inputLen > 6 && winWid >= 1910){
				$scope.isShow = true;
			}else{
				$scope.isShow = false;
			}			
		}
		
		window.addEventListener("resize",onWinResize);
		
		$scope.toogleH = function(){			
			$scope.isActive = !$scope.isActive;
		}
		$scope.getPagingList=function(currentPage, pageSize,sort){
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
   		
   		var emptyInputs = document.getElementsByClassName("empty-input");
   		for(var i=0; i<emptyInputs.length; i++){
   			emptyInputs[i].onclick = function(){
   				$(this).prev().val("")
   			}
   		}

		var add = function() {
			ModalService.showModal({
				templateUrl: 'device/templates/device_list_form.html',
				controller: 'DeviceListFormCtrl',
				inputs: {
					title: '新建设备',
					userInfo: {}
				}
			}).then(function(modal) {
				modal.close.then(function(result) {
					GridService.refresh($scope);
				});
			});
		};
		
		var edit =function(value){
			ModalService.showModal({
	            templateUrl: 'device/templates/device_list_set.html',
	            controller: 'DeviceListEditCtrl',
	            inputs: { 
	                row : value,
	                typeList : $scope.devicedTypeList
	            }
	        }).then(function(modal) {
	            //modal.element.modal();
	            modal.close.then(function() { 
	                /*$scope.promise = gridServices.promiseNew('/device/deviceAction!getScopeDevice.action',{
	                    page: $scope.newPage ? $scope.newPage : 1,
	                    rows: 20,
	                    sort : 'id',
	                    order: 'desc'
	                });
	                $scope.getPage($scope.promise);*/
	            });
	        });
		};

		var startCapture = function() {
			var selection = $scope.gridApi.selection.getSelectedRows();
		        if( selection == null || selection.length != 1){
		            DialogService.showConfirm(
		                '提示',
		                '请选择一条进行操作！',null)
					return;
		        }else{
					ModalService.showModal({
						templateUrl: 'device/templates/device_list_add_task_form.html',
						controller: 'DeviceListAddTaskFormCtrl',
						inputs: {
							title: '启动捕获程序',
							userInfo: {}
						}
					}).then(function(modal) {
						modal.close.then(function(result) {
							GridService.refresh($scope);
						});
					});
				}
		};

		var restartCapture = function() {
			var selection = $scope.gridApi.selection.getSelectedRows();
			if( selection == null || selection.length != 1){
		            DialogService.showConfirm(
		                '提示',
		                '请选择一条进行操作！',null)
					return;
		        }else{
					ModalService.showModal({
						templateUrl: 'device/templates/device_list_add_task_form.html',
						controller: 'RestartCaptureCtrl',
						inputs: {
							title: '重启捕获程序',
							userInfo: {}
						}
					}).then(function(modal) {
						modal.close.then(function(result) {
							GridService.refresh($scope);
						});
					});
				}
		};

		var closeCapture = function() {
			var selection = $scope.gridApi.selection.getSelectedRows();
			if( selection == null || selection.length != 1){
		            DialogService.showConfirm(
		                '提示',
		                '请选择一条进行操作！',null)
					return;
		        }else{
					ModalService.showModal({
						templateUrl: 'device/templates/device_list_add_task_form.html',
						controller: 'CloseCaptureCtrl',
						inputs: {
							title: '关闭捕获程序',
							userInfo: {}
						}
					}).then(function(modal) {
						modal.close.then(function(result) {
							GridService.refresh($scope);
						});
					});
				}
		};

		var catchPoint = function() {
			var selection = $scope.gridApi.selection.getSelectedRows();
			if( selection == null || selection.length != 1){
		            DialogService.showConfirm(
		                '提示',
		                '请选择一条进行操作！',null)
					return;
		        }else{
					ModalService.showModal({
						templateUrl: 'device/templates/device_list_add_task_form.html',
						controller: 'CatchPointCtrl',
						inputs: {
							title: '捕获近设备频点',
							userInfo: {}
						}
					}).then(function(modal) {
						modal.close.then(function(result) {
							GridService.refresh($scope);
						});
					});
				}
		};

		var sameClock = function() {
			var selection = $scope.gridApi.selection.getSelectedRows();
			if( selection == null || selection.length != 1){
		            DialogService.showConfirm(
		                '提示',
		                '请选择一条进行操作！',null)
					return;
		        }else{
					ModalService.showModal({
						templateUrl: 'device/templates/device_list_add_task_form.html',
						controller: 'SameClockCtrl',
						inputs: {
							title: '同步设备时钟',
							userInfo: {}
						}
					}).then(function(modal) {
						modal.close.then(function(result) {
							GridService.refresh($scope);
						});
					});
				}
		};

		var restartSystem = function() {
			var selection = $scope.gridApi.selection.getSelectedRows();
			if( selection == null || selection.length != 1){
		            DialogService.showConfirm(
		                '提示',
		                '请选择一条进行操作！',null)
					return;
		        }else{
					ModalService.showModal({
						templateUrl: 'device/templates/device_list_add_task_form.html',
						controller: 'RestartSystemCtrl',
						inputs: {
							title: '重启设备系统',
							userInfo: {}
						}
					}).then(function(modal) {
						modal.close.then(function(result) {
							GridService.refresh($scope);
						});
					});
				}
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
		
		var imports = function(){
	        ModalService.showModal({
	            templateUrl: 'device/templates/device_import.html',
	            controller: 'DeviceImportCtrl'
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
				{ 
		        	field: 'btnGroup',
		        	displayName: '设备操作',
		        	maxWidth:200,minWidth:90/*,
		        	cellTemplate: '<a class="btnIcon btn-edit" href ng-click="grid.appScope.edit(row.entity)" uib-tooltip="编辑" tooltip-placement="left"></a><a class="btnIcon btn-gear" href ng-class="{ ' + str + ' : grid.appScope.isOpen(row.entity) }" ng-click="grid.appScope.setSearch(row.entity)" uib-tooltip="设置" tooltip-placement="left"></a><a class="btnIcon btn-alarm" href ng-click="grid.appScope.alarmSearch(5,row.entity)" uib-tooltip="实时告警查询" tooltip-placement="left"></a>'*/
		       },
		        { field: 'number',displayName: '设备编号',maxWidth:200,minWidth:90 },
		        { field: 'longitude',displayName: '设备经度',maxWidth:200,minWidth:90 },
		        { field: 'latitude',displayName: '设备纬度',maxWidth:200,minWidth:90 },
		        { 
		            field: 'btnGroup',
		            displayName: '设备心跳状态', 
		            maxWidth:200,minWidth:110/*,
		            cellTemplate: '<span class="btnIcon" ng-class="{ ' + gray + ' : !row.entity.isonLine,' + green + ': !!row.entity.isonLine}"></span>'*/
		        },
		        { 
		            field: 'btnGroup',
		            displayName: 'BTS在线状态', 
		            maxWidth:200,minWidth:110/*,
		            cellTemplate: '<div ng-if="!row.entity.bts&&!row.entity.isonLine" class="bts-status">N/A</div> <span ng-if="!!row.entity.isonLine" class="btnIcon" ng-class="{ ' + gray + ' : !row.entity.bts,' + green + ': !!row.entity.bts}"></span>'*/
		        },
		        { field: 'last_report_time',displayName: '最后一次上号时间',maxWidth:200,minWidth:128 },
		        { field: 'modelId',displayName: '设备网络制式',maxWidth:200,minWidth:116 },
		        { field: 'address',displayName: '设备地址',maxWidth:200,minWidth:90 },
		        { field: 'groupId',displayName: '组编号',maxWidth:200,minWidth:90 }		        
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
					css: 'fa fa-fw fa-plus-circle',
					tooltip: '添加',
					method: add
				},
				{
					css: 'fa fa-fw fa-arrow-circle-down',
					tooltip: '批量导入',
					method: imports
				},
				{
					css: 'fa fa-fw fa-minus-circle',
					tooltip: '删除',
					method: remove
				},
				{
					css: 'fa fa-fw fa-play-circle-o',
					tooltip: '启动捕获程序',
					//method: noWifiLte(0, 'StartCaptureCtrl')
					method: startCapture
				},
				{
					css: 'fa fa-fw fa-repeat',
					tooltip: '重启捕获程序',
					method: restartCapture
				},
				{
					css: 'fa fa-fw fa-times-circle-o',
					tooltip: '关闭捕获程序',
					method: closeCapture
				},
				{
					css: 'fa fa-fw fa-power-off',
					tooltip: '重启设备系统',
					method: restartSystem
				},
				{
					css: 'fa fa-fw fa-share-square-o',
					tooltip: '导出',
					method: edit
				},
				{
					css: 'fa fa-fw fa-download',
					tooltip: '批量导入模板下载',
					method: remove
				}
			]

		});
		
		$scope.doSearch = function() {
			$scope.gridapi.refresh();
		};

		$scope.edit = function() {
			if($scope.gridapi.getSelectedRows().length === 0) {
				return;
			}
			openData($scope.gridapi.getSelectedRows()[0]);
		};

		$scope.add = function() {
			openData();
		};

		$scope.delete = function() {
			if($scope.gridapi.getSelectedRows().length === 0) {
				return;
			}
			HttpService.post('device/info/delete', {
					ids: $scope.gridapi.getSelectedRows()
				})
				.then(function success() {
						AlertService.show('删除成功');
						$scope.gridapi.refresh();
					},
					function failure(errorResponse) {
						AlertService.show(errorResponse);
					});
		};

		var openData = function(id) {
			$mdDialog.show({
				controller: function($scope, $mdDialog, HttpService, AlertService, BaseService, SystemService, id) {
					$scope.data = {};
					if(id) {
						HttpService.post('device/info/get', {
								query: {
									id: id
								}
							})
							.then(function success(data) {
									$scope.data = data.items[0];
									$scope.data.upgrading = 1;
									console.dir($scope.data);
								},
								function failure(errorResponse) {
									AlertService.show(errorResponse);
								});
					} else {
						$scope.data = {
							upgrading: 0
						};
					}
					BaseService.getVendors().then(function(data) {
						$scope.vendors = data.items;
					});

					BaseService.getDevicetypes().then(function(data) {
						$scope.deviceTypes = data.items;
					});

					BaseService.getFirmwares().then(function(data) {
						$scope.firmwares = data.items;
					});

					SystemService.getScopes().then(function(data) {
						$scope.domains = data.items;
					});

					$scope.apply = function() {
						$scope.validate().then(function() {
							HttpService.post('device/info/save', $scope.data)
								.then(function success(data) {
										console.dir(data);
										AlertService.show('保存成功');
										$mdDialog.hide(true);
									},
									function failure(errorResponse) {
										AlertService.show(errorResponse);
									});
						});
					};

					$scope.cancel = function() {
						$mdDialog.cancel();
					};
				},
				templateUrl: 'js/modules/device/templates/tpl.device.info.html',
				clickOutsideToClose: true,
				fullscreen: false,
				locals: {
					id: id
				}
			}).then(function(result) {
				if(result) {
					$scope.gridapi.refresh();
				}
			});
		};

		$scope.config = {
			colNames: ['ID', '在线状态', '小区状态', '管理域', 'PCI', 'CELLID', 'IP', '设备Key', '软件版本', '设备类型', '设备告警', '设备描述', '升级状态'],
			colModel: [{
					name: 'id',
					index: 'id',
					width: 100,
					sorttype: 'int'
				},
				{
					name: 'status',
					index: 'status',
					width: 100,
					sortable: true,
					align: 'center'
				},
				{
					name: 'provision_status',
					index: 'provision_status',
					width: 100,
					sortable: true,
					align: 'center'
				},
				{
					name: 'adminDomain.name',
					index: 'adminDomain.name',
					width: 100,
					sortable: true,
					align: 'center'
				},
				{
					name: 'pci',
					index: 'pci',
					width: 100,
					sortable: true,
					align: 'center'
				},
				{
					name: 'cellid',
					index: 'cellid',
					width: 100,
					sortable: true,
					align: 'center'
				},
				{
					name: 'ip',
					index: 'ip',
					width: 100,
					sortable: true,
					align: 'center'
				},
				{
					name: 'dkey',
					index: 'dkey',
					width: 100,
					sortable: true,
					align: 'center'
				},
				{
					name: 'fwVersion',
					index: 'fwVersion',
					width: 100,
					sortable: true,
					align: 'center'
				},
				{
					name: 'deviceType.name',
					index: 'deviceType.name',
					width: 100,
					sortable: true,
					align: 'center'
				},
				{
					name: 'alarmCount',
					index: 'alarmCount',
					width: 100,
					sortable: true,
					align: 'center'
				},
				{
					name: 'desc',
					index: 'desc',
					width: 100,
					sortable: true,
					align: 'center'
				},
				{
					name: 'upgrading',
					index: 'upgrading',
					width: 100,
					sortable: true,
					align: 'center'
				}
			],
			formatter: 'actions',
			formatoptions: {
				keys: true,
				editformbutton: true
			},
			uri: 'device/info/get'
		};

		$scope.export = function() {
			var filter = {
				"fields": [
					"name",
					"type",
					"description",
					"reportItems#id,name"
				]
			};
			HttpService.download('device/info/download', filter);
		};

		$scope.import = function() {
			$mdDialog.show({
				controller: function($scope, $mdDialog) {
					$scope.cancel = function() {
						$mdDialog.cancel();
					};

					$scope.onFileSelect = function($file) {
						if(!$file) {
							return;
						}
						var file = $file;
						HttpService.upload('device/info/upload', {
							data: {
								fileName: $scope.file
							},
							file: file
						}).progress(function(evt) {
							$scope.isWaiting = true;
						}).success(function(data, status, headers, config) {
							$scope.license = data;
							if(!!data && data.status === -1) {
								$scope.showWarning = true;
								return;
							}
							$scope.showWarning = false;

						}).error(function(data, status, headers, config) {
							// console.info(data);
						}).finally(function() {
							$scope.isWaiting = false;
							$mdDialog.hide();
						});

					};
				},
				templateUrl: 'js/modules/device/templates/tpl.device.import.html',
				clickOutsideToClose: true,
				fullscreen: false
			}).then(function() {

			});
		};
		
		$scope.search = function() {
			GridService.refresh($scope);
		};
	
	}
});