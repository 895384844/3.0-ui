/**
 * Created by zhaoyang on 16/8/29.
 */
define(['moment', 'echarts'], function (moment, echarts) {
	return ['$scope', 'HttpService','GridService', AcrossAnalysisCtrl];

	function AcrossAnalysisCtrl($scope, HttpService,GridService) {
		$scope.btn = {
	        status : true
	    }
		$scope.currentW = true;
	    $scope.changeW = false;

	    $scope.toogleLeftState = function(){
	    	$scope.currentW = !$scope.currentW;
	    	$scope.changeW = !$scope.changeW;
	    	//oBox.style.width = "";
	    	//oBox.style.minWidth = "";	    	
	    }
	    
	    /*function get_unix_time(dateStr){		//把日期字符串转成时间戳
		    var newstr = dateStr.replace(/-/g,'/'); 
		    var date =  new Date(newstr); 
		    var time_str = date.getTime().toString();
		    return time_str.substr(0, 10);
		}*/
	    
	    $scope.list = [];
	    
	    $scope.query = [
	    	{
	    		groupID : '',
	    		startTime : '',
	    		endTime : ''
	    	},
	    	{
	    		groupID : '',
	    		startTime : '',
	    		endTime : ''
	    	}
	    ];	    
	    $scope.addCondition = function(){
	    	var obj={addElement:"addElement"};
			$scope.list.push(obj);
			$scope.query = $scope.query.concat($scope.list);
			//console.log($scope.arr)
	    }
				
		$scope.delEle=function(idx){
		    $scope.list.splice(idx,1);
		    $scope.query.splice(idx,1);
		    //console.log($scope.arr)
		}
		
		$scope.getPagingList = function(currentPage, pageSize, sort) {
			var filter={page_size:pageSize,page_no:currentPage-1};
			//filter.complexQuery = [];
            if($scope.query){
            	//filter.complexQuery = [];
            	//filter.complexQuery = filter.complexQuery.push($scope.query);
            	filter.complexQuery = angular.copy($scope.query);
            	//console.log(filter.complexQuery)
            	//filter.complexQuery.startTime = get_unix_time(filter.complexQuery.startTime);
            	//filter.complexQuery.endTime = get_unix_time(filter.complexQuery.endTime);
            	//console.log(filter.complexQuery);
            }
            if(!!sort){
            	filter.order_by=sort;
            }
           return HttpService.post('map',filter,filter);
		};

		HttpService.post('system/scope/get').then(function success(data) {
				$scope.domains = data.items;
			},
			function failure(errorResponse) {
			}, function (value) {
			});

		$scope.doSearch1 = function () {
			if (_.isUndefined($scope.selectedDomain)) {
				return;
			}
			var query = {
				query: {
					"admin_domain__$$device_view": $scope.selectedDomain,
					"policy_id__isnull": true
				}
			};
			doSearch(query);
		};

		$scope.query2 = {
			query: {
				complete_time__range__$DATE: []
			}
		};

		$scope.doSearch2 = function () {
			$scope.query2.query.complete_time__range__$DATE[0] = moment($scope.startDate).format('YYYY-MM-DD');
			$scope.query2.query.complete_time__range__$DATE[1] = moment($scope.endDate).format('YYYY-MM-DD');
			$scope.query2.query.policy_id__isnull = false;
			doSearch($scope.query2);
		};

		
		var doSearch = function (query) {
			HttpService.post('report/fwupgrade/result', query).then(function success(data) {
				console.dir(data);
					var succeedDatas = {
						name: '成功',
						type: 'line',
						data: []
					};
					var failedDatas = {
						name: '失败',
						type: 'line',
						data: []
					};
					var _date = [];

					_.forEach(data, function (item) {
						_date.push(item.date);
						succeedDatas.data.push(item.SUCCESSED);
						failedDatas.data.push(item.FAILED);
					});

					var chart = echarts.init(document.getElementById('report_fwupgrade_charts'));
					var option = {
						title: {
							text: '升级结果汇总',
							subtext: '(默认页面载入最近七天数据)'
						},
						legend: {
							data:['成功','失败']
						},
						tooltip : {
							trigger: 'axis'
						},
						toolbox: {
							show : true,
							feature : {
								mark : {show: true},
								dataView : {show: true, readOnly: false},
								magicType : {show: true, type: ['line', 'bar']},
								restore : {show: true},
								saveAsImage : {show: true}
							}
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: _date
						},
						yAxis: {
							type: 'value'
						},
						series: [succeedDatas, failedDatas]
					};
					chart.setOption(option);
				},
				function failure(errorResponse) {
				}, function (value) {
				});
		};
		var add = function () {
				ModalService.showModal({
                    templateUrl: 'system/templates/user_form.html',
                    controller: 'SystemUserEditCtrl',
                    inputs:{
                        title:'新建用户',
                        userInfo:{}
                    }
                }).then(function(modal) {
                    modal.close.then(function(result) {
                           GridService.refresh($scope);
                    });
                });
			};
		
		GridService.create($scope,{
				fetchData:true,
				columnDefs:[
			        { field: 'imei',displayName: 'IMEI',maxWidth:500,minWidth:150 },
		            { field: 'imsi',displayName: 'IMSI',maxWidth:500,minWidth:150 },
		            { field: 'totleNum',displayName: '查询结果总数',maxWidth:500,minWidth:120 },
		            { field: 'didCount',displayName: '经过设备点位个数',maxWidth:500,minWidth:130 },
		            { field: 'dids',displayName: '设备点位详情',maxWidth:500,minWidth:150 },
		            { 
		                field: 'btnGroup',
		                displayName: '查看轨迹',
		                maxWidth:500,minWidth:100,
		                cellTemplate: '<a class="btnIcon btn-search" href ng-click="grid.appScope.showMap(row.entity)"></a>'
		            }
			    ],
			    btnTools:[
			    	{
				    	css:'fa fa-fw fa-refresh',
				    	tooltip:'刷新',
				    	method:function(){
				    		GridService.refresh($scope);
				    	}
			    	},
			    	{
				    	css:'fa fa-fw fa-share-square-o',
				    	tooltip:'导出',
				    	method:add
			    	},
			    	{
				    	css:'fa fa-fw fa-download',
				    	tooltip:'下载',
				    	method:add
			    	}
			    ]
		});		
				
		$scope.search = function(){
			$scope.toogleLeftState();
			//console.log(document.getElementsByClassName("val").value);
			GridService.refresh($scope);
		}
	}
});
