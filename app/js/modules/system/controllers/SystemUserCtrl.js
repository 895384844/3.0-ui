define(
	function () {
		return ['$scope', 'i18nService','$lt',  '$filter', 'localSession', 'GridService','DialogService', 'ModalService', 'HttpService', 'SystemService', '$http', SystemUserCtrl];
		function SystemUserCtrl($scope, i18nService,$lt, $filter, localSession, GridService,DialogService, ModalService, HttpService, SystemService,$http) {


			$scope.gridItemData = {};
			$scope.query = {};
			$scope.selectData = {};
			
			var emptyInputs = document.getElementsByClassName("empty-input");
	   		for(var i=0; i<emptyInputs.length; i++){
	   			emptyInputs[i].onclick = function(){
	   				$(this).prev().val("")
	   			}
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

       		var remove=function(){
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
	    	var removes=function(){
       			var selection = $scope.gridApi.selection.getSelectedRows();
		        if( selection.length == 0){
		            DialogService.showConfirm(
		                '提示',
		                '至少选择一条进行操作！',null)
					return;
		        }
	    	};

	    	var add = function () {
				ModalService.showModal({
                    templateUrl: 'system/templates/user_form.html',
                    controller: 'SystemUserEditCtrl',
                    inputs:{
                        title:'新增用户',
                        userInfo:{}
                    }
                }).then(function(modal) {
                    modal.close.then(function(result) {
                           GridService.refresh($scope);
                    });
                });
			};
			var edit = function () {
				var selection = $scope.gridApi.selection.getSelectedRows();
				if (selection.length <= 0) {
					DialogService.showConfirm(
		                '提示',
		                '请选择要编辑的用户',null)
					return;
				}

				if (selection.length > 1) {
					DialogService.showConfirm(
		                '提示',
		                '最多选择一项！',null)
					return;
				}
				/*var rid = selection[0];
				$scope.selectData = $scope.gridApi.selection.getSelectedData(rid);
				$scope.getgridData = $scope.gridApi.selection.getgridData();
				var dataArray = $scope.getgridData.items;
				$.each(dataArray, function (n, data) {
					if ($scope.selectData.id == data.id) {
						$scope.gridItemData = data;
						$scope.gridItemData.confirm = $scope.gridItemData.password;
					}
				});*/
				//$scope.gridItemData.isEdit = 'true';
				ModalService.showModal({
                    templateUrl: 'system/templates/edit.html',
                    controller: 'SystemUserEditCtrl',
                    inputs:{
                        title:'编辑用户',
                        userInfo:{}
                    }
                })
			};

			var role = function(){
				var selection = $scope.gridApi.selection.getSelectedRows();
		        if( selection == null || selection.length != 1){
		            DialogService.showConfirm(
		                '提示',
		                '请选择一项要编辑的用户',null)
					return;
		        }else{
		            ModalService.showModal({
		                templateUrl: 'system/templates/user_role.html',
		                controller: 'SystemUserRoleCtrl',
		                inputs: {
		                    row: $scope.row
		                }
		            })/*.then(function(modal) {
		                modal.element.modal();
		                modal.close.then(function(result) {
		                    $scope.promise = gridServices.promiseNew('system/userAction!listUser.action',{
		                        page: $scope.newPage ? $scope.newPage : 1,
		                        rows: 20,
		                        sort : 'id',
		                        order: 'desc'
		                    });
		                    $scope.getPage($scope.promise);
		                });
		            });*/
		        }
		    };
			
			var resetPsw = function() {
				var selection = $scope.gridApi.selection.getSelectedRows();
		        if( selection != null && selection.length > 0){
		            ModalService.showModal({
		                templateUrl: 'system/templates/resetPwd.html',
		                controller: 'SystemResetPwdCtrl',
		                inputs: { // 将$scope.rows以参数名rows注入到 deleteUserCtrl
		                    rows: $scope.rows
		                }
		            })/*.then(function(modal) {
		                modal.element.modal();
		                modal.close.then(function(result) {
		                    $scope.promise = gridServices.promiseNew('system/userAction!listUser.action',{
		                        page: $scope.newPage ? $scope.newPage : 1,
		                        rows: 20,
		                        sort : 'id',
		                        order: 'desc'
		                    });
		                    $scope.getPage($scope.promise);
		                });
		            });*/
		        }else{
		            DialogService.showConfirm(
		                '提示',
		                '请选择一条处理！',null)
					return;
		        }		
		    };
		    
		    /*var export = function(){
		        if($scope.user.male == '男'){
		            $scope.user.male = 1;
		        }else if($scope.user.male == '女'){
		            $scope.user.male = 2;
		        }else{
		            $scope.user.male = '';
		        }
		
		        var obj = {
		            account: $scope.user.account, 
		            name : $scope.user.name,
		            male : $scope.user.male
		        };
		
		        document.location.href = gridServices.exportAction('/system/userAction!exportExcel.action',obj);
		
		    };
		    
		    var downLoad = function(){
		        $http.get('/system/downloadAction!listFileName.action').then(function(resp){
					if(resp.data){
		                ModalService.showModal({
			                templateUrl: 'system/templates/downLoad.html',
			                controller: 'SystemDownloadCtrl',
			                inputs: { 
			                    rows: resp.data 
			                }
			            }).then(function(modal) {
			                modal.element.modal();
			                modal.close.then(function(result) {
			                });
			            });
					}
				});
			};*/
		    
		    /*var unLock = function(){
		    	var selection = $scope.gridApi.selection.getSelectedRows();
		        if( selection != null && selection.length >0){
		            var ids = [];
		            var list = $scope.rows;
		            for(var i=0; i<list.length; i++){
		                ids.push(list[i]['id']);
		            }
		            $http({
		                url:'/system/userAction!unlockPwd.action',
		                method:'POST',
		                params:{ ids : ids.join()}   
		            }).then(function(resp){
		            	if(resp.data.status == 'success'){
		            		 $scope.promise = gridServices.promiseNew('system/userAction!listUser.action',{
		                        page: $scope.newPage ? $scope.newPage : 1,
		                        rows: 20,
		                        sort : 'id',
		                        order: 'desc'
		                    });
		                    $scope.getPage($scope.promise);
		            		alert('解锁成功！');
		            	}else{
		            		alert('解锁失败！');
		            	}
		            });
		            
		        }else{
		            alert('请至少选择一条处理！');
		        }
		    };*/
			
			GridService.create($scope,{
				fetchData:true,
				columnDefs:[
			        { field: 'account',displayName: '用户名' },
			        { field: 'name',displayName: '角色' },
			        { field: 'male',displayName: '账号状态' },
			        { field: 'mobile',displayName: '手机' }
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
				    	css:'fa fa-fw fa-minus-circle',
				    	tooltip:'删除',
				    	method:remove
			    	},
			    	{
				    	css:'fa fa-fw fa-pencil',
				    	tooltip:'编辑',
				    	method:edit
			    	},
			    	{
				    	css:'fa fa-fw fa-repeat',
				    	tooltip:'重置密码',
				    	method:resetPsw
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
			    	},
			    	{
				    	css:'fa fa-fw fa-unlock-alt',
				    	tooltip:'解锁',
				    	method:removes
			    	}
			    ]

			});


			

			$scope.search = function () {
				GridService.refresh($scope);
			};
		}
	});
