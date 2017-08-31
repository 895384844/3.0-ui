define(function() {
	return ['$scope', 'i18nService', '$lt', '$filter', 'GridService', 'ModalService', '$element', 'localSession', 'HttpService', 'DialogService', 'SystemService', PartnerAnalysisCtrl];

	function PartnerAnalysisCtrl($scope, i18nService, $lt, $filter, GridService, ModalService, $element, localSession, HttpService, DialogService, SystemService) {
		$scope.btn = {
	        status : true
	    }
		$scope.gridItemData = {};
		$scope.query = {
	        atype:'known',
	        targetEid : '',
	        groupId : '',
	        startTime : '',
	        endTime : '',
	        serialNumber : '',
	        type : 'imsi'
	    };
		$scope.selectData = {};
		/*var oBox=document.getElementById('par_resize');//得到需要拖动右边改变宽度的盒子。
		var X='';	//初始化需要改变宽度盒子的宽度。
		//拖动盒子的右边改变盒子宽度。
		oBox.onmousedown=function (ev){
			var iEvent=ev || event; 
			var W=oBox.offsetWidth;
			var disX=iEvent.clientX; 
			if(iEvent.clientX>oBox.offsetLeft+oBox.offsetWidth-20){  
                //alert('碰到了盒子的右边！');  
                //赋予上面X的值这时等于right  好用于下面的对比  
                X='right';  
                oBox.style.cursor='e-resize';  
            }else{
            	X = '';
            	oBox.style.cursor='auto';
            }
			document.onmousemove=function (ev){  
                var iEvent=ev || event; //当当前的鼠标值减去之前获取的鼠标值为正数 那么正数加正数是增大  
                if (X=='right') {       //当当前的鼠标值减去之前获取的鼠标值为负数 那么正数加负数是变小  
                    oBox.style.width=W+(iEvent.clientX-disX)+'px'; 
                    oBox.style.minWidth="330px";
                }
            }
			document.onmouseup=function (){  
                document.onmousedown=null;  
                document.onmousemove=null;//一像素的触发的事件为空   
            } 
		}*/
		
		$scope.currentW = true;
	    $scope.changeW = false;
	    $scope.toogleLeftState = function(){
	    	$scope.currentW = !$scope.currentW;
	    	$scope.changeW = !$scope.changeW;
	    	oBox.style.width = "";
	    	oBox.style.minWidth = "";
	    }
	    
	    $scope.list = [];	    	    	    
	    $scope.addCondition = function(){
	    	var obj={addElement:"addElement"};
			$scope.list.push(obj);
	    }
				
		$scope.delEle=function(idx){
		    $scope.list.splice(idx,1);
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

		GridService.create($scope, {
			fetchData: true,
			columnDefs: [
			{ field: 'imei',displayName: 'IMEI' },
            { field: 'imsi',displayName: 'IMSI'  },
            { field: 'similar',displayName: '轨迹相似度' },
            { 
            	field: 'operation',
            	displayName: '详情查询',
            	cellTemplate: '<a class="btnIcon btn-search" href ng-click="grid.appScope.searchDetails(row.entity)" uib-tooltip="详情查询" tooltip-placement="left"></a>'
            }
			]/*,
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
			}, {
				css: 'fa fa-fw fa-minus-circle',
				tooltip: '删除',
				method: remove
			}]*/

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
			$scope.toogleLeftState()
			//GridService.refresh($scope);
		};
		
		
		$scope.showCondition = function(){
        ModalService.showModal({
            templateUrl: 'modals/collisionAnalysis/filter.html',
            controller: 'collisionFilterModalCtrl'
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {     
                if(typeof(result) !== 'undefined'){
                    $scope.conditionArray.push(result);
                }
            });
        });
    }

    $scope.removeCondition = function(index) {
        $scope.conditionArray.splice(index,1); 
        angular.element('.grid').trigger('resize')
    }

    $scope.known = true;
    $scope.unknown = false;
    $scope.tab = function() {
        $scope.known = !$scope.known;
        $scope.unknown = !$scope.unknown;
    }

	}
});