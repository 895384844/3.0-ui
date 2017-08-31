define(function() {
	return ['$scope', 'i18nService', '$lt', '$filter', 'GridService', 'ModalService', '$element', 'localSession', 'HttpService', 'DialogService', 'SystemService', TraceLogCtrl];

	function TraceLogCtrl($scope, i18nService, $lt, $filter, GridService, ModalService, $element, localSession, HttpService, DialogService, SystemService) {

		$scope.gridItemData = {};
		$scope.query = {};
		$scope.selectData = {};
		
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
		
		function get_unix_time(dateStr){		//把日期字符串转成时间戳
		    var newstr = dateStr.replace(/-/g,'/'); 
		    var date =  new Date(newstr); 
		    var time_str = date.getTime().toString();
		    return time_str.substr(0, 10);
		}
		
		$scope.getPagingList = function(currentPage, pageSize, sort) {
			var filter={
				page_size:pageSize,
				page_no:currentPage-1
			};
            if($scope.query){
            	filter.query = angular.copy($scope.query);
            	filter.query.flag = "pager";
            	filter.query.startTime = get_unix_time(filter.query.startTime);
            	filter.query.endTime = get_unix_time(filter.query.endTime);
            }
            if(!!sort){
            	filter.order_by=sort;
            }
           return HttpService.post('/rest/center/trace/search',filter);
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

		GridService.create($scope, {
			fetchData: true,
			columnDefs: [{
					field: 'imei',
					displayName: 'IMEI'
				},
				{
					field: 'imsi',
					displayName: 'IMSI'
				},
				{
					field: 'name',
					displayName: '采集设备名称'
				},
				{
					field: 'deviceID',
					displayName: '采集设备编号'
				},
				{
					field: 'location',
					displayName: '采集设备地址'
				},
				{
					field: 'timestamp',
					displayName: '采集时间'
				}
			],
			btnTools: [{
					css: 'fa fa-fw fa-refresh',
					tooltip: '刷新',
					method: function() {
						GridService.refresh($scope);
					}
				},
				{
					css: 'fa fa-fw fa-share-square-o',
					tooltip: '导出',
					method: add
				},
				{
					css: 'fa fa-fw fa-download',
					tooltip: '下载',
					method: add
				}
			]

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
		
		$scope.showMap = function(){
			$scope.getPagingList = function(currentPage, pageSize, sort) {
				var filter={page_size:pageSize,page_no:currentPage-1};
	            if($scope.query){
	            	filter.query = angular.copy($scope.query);
	            	filter.query.flag = "pager";
	            	filter.query.startTime = get_unix_time(filter.query.startTime);
	            	filter.query.endTime = get_unix_time(filter.query.endTime);
	            }
	            if($scope.search){
	                angular.extend(filter,$scope.search);
	            }
	            if(!!sort){
	            	filter.order_by=sort;
	            }
	           return HttpService.get('device',filter);
			};
			GridService.refresh($scope);
			ModalService.showModal({
				templateUrl: 'report/templates/trace_log_showMap.html',
				controller: 'ShowMapCtrl',
				inputs: {
					title: '新建设备',
					userInfo: {}
				}
			}).then(function(modal) {
				modal.close.then(function(result) {
					GridService.refresh($scope);
				});
			});
		}

	}
});