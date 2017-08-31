define(function () {
	return ['$scope', 'HttpService', 'AlertService','GridService','DialogService', 'ModalService',BusUserCtrl];

	function BusUserCtrl($scope, HttpService, AlertService,GridService,DialogService,ModalService) {
		$scope.query = {};
		
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
		var add = function () {
				ModalService.showModal({
                    templateUrl: 'base/templates/bus_user_form.html',
                    controller: 'BusUserListCtrl',
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
		var remove=function(){
			var selection = $scope.gridApi.selection.getSelectedRows();
		        if( selection == null || selection.length != 1){
		            DialogService.showConfirm(
		                '提示',
		                '请选择一条进行操作！',null)
					return;
		        }else{
		    		DialogService.showConfirm(
		                '确认信息',
						'确定要删除吗？',
		                function() {
		                    ids=[];
		                    selection=$scope.gridApi.selection.getSelectedRows();
		                    for (var i in selection){
		                        ids.push(selection[i].id);
		                    }
		                    HttpService.remove('users/',{ids:ids}).then(function success(data){
		                        GridService.refresh($scope);
		                    },
		                    function failure(errorResponse){
		                        
		                    })
		                    .finally(function(){
		
		                    });
		                }, null);
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
	                    templateUrl: 'base/templates/bus_user_edit.html',
	                    controller: 'BusUserEditCtrl',
	                    inputs:{
	                        title:'编辑用户',
	                        userInfo:{}
	                    }
	                }).then(function(modal) {
	                    modal.close.then(function(result) {
	                           GridService.refresh($scope);
	                    });
	                });
	           }
			};
	    	
	    /*var edit = function(){
	        if( $scope.rows == null || $scope.rows.length != 1){
	            alert('请选择其中一条处理！');
	        }else{
	            ModalService.showModal({
	                templateUrl: 'base/templates/bus_user_edit.html',
	                controller: 'BusUserEditCtrl',
	                inputs: {
	                    row: $scope.row
	                }
	            }).then(function(modal) {
	                modal.element.modal();
	                modal.close.then(function() {                
	                    $scope.promise = gridServices.promiseNew('/query/PeopleAction!getPeople.action',{
	                        page: $scope.newPage ? $scope.newPage : 1,
	                        rows: 20
	                    });
	                    $scope.getPage($scope.promise);
	                });
	            });  
	        }
	    };
			*/
		GridService.create($scope,{
				fetchData:true,
				columnDefs:[
			        { field: 'peopleName',displayName: '人员名称',maxWidth:400,minWidth:200 },
			        { field: 'sex',displayName: '性别',maxWidth:400,minWidth:200 },
			        { field: 'status',displayName: '身份',maxWidth:400,minWidth:200 },
			        { field: 'contactTel',displayName: '电话号码',maxWidth:400,minWidth:200 },
			        { field: 'email',displayName: '电子邮箱',maxWidth:400,minWidth:200 }
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
				    	css:'fa fa-fw fa-plus-circle',
				    	tooltip:'添加',
				    	method:add
				    },
			    	{
				    	css:'fa fa-fw fa-pencil',
				    	tooltip:'编辑',
				    	method:edit
				    },
			    	{
				    	css:'fa fa-fw fa-minus-circle',
				    	tooltip:'删除',
				    	method:remove
			    	},
			    	{
				    	css:'fa fa-fw fa-share-square-o',
				    	tooltip:'导出',
				    	method:remove
			    	},
			    	{
				    	css:'fa fa-fw fa-download',
				    	tooltip:'下载',
				    	method:remove
			    	}
			    ]

			});
		$scope.search = function() {
			GridService.refresh($scope);
		};
	}
})