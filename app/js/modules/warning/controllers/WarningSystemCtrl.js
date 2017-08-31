define(function() {
	return ['$scope', '$element', 'localSession', 'HttpService', 'DialogService', 'GridService', WarningSystemCtrl];

	function WarningSystemCtrl($scope, $element, localSession, HttpService, DialogService, GridService) {

		//WarningService.init($scope);

		//$scope.config=WarningService.original_config;

		$scope.query = {};
		
		//$scope.query.cleared = 0;
		
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
		

		$scope.export = function() {

			var filter = {
				sheetName: '当前告警',
				title: '当前告警',
				fields: [],
				headers: $scope.config.colNames,
				query: $scope.gridapi.getSearchInfo().query,
				fileType: "xlsx"
			};
			for(var index in $scope.config.colModel) {
				filter.fields.push($scope.config.colModel[index].name);
			}
			var uri = 'device/alarm/export';
			HttpService.download(uri, filter).then(function(data) {
				$('#download_file').attr('src', 'rest/files/download?fileName=' + data.file);
			});
		};
		GridService.create($scope, {
			fetchData: true,
			columnDefs: [{
					field: 'deviceName',
					displayName: '告警分类'
				},
				{
					field: 'alarmCause',
					displayName: '告警原因'
				},
				{
					field: 'date',
					displayName: '告警时间'
				}
			],
			btnTools: [{
					css: 'fa fa-fw fa-refresh',
					tooltip: '刷新',
					method: function() {
						GridService.refresh($scope);
					}
				}
				/*, 
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
								}*/
			]
		});

		$scope.remove = function() {
			WarningService.remove($scope.gridapi.getSelectedRows(), $scope);
		};

		$scope.search = function() {
			GridService.refresh($scope);
		};
	}
});