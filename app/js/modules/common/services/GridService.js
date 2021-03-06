define(function() {
    function GridService($document) {
        function createGrid(options) {
            var gridOptions={};
        	angular.extend(gridOptions,{   
			            paginationPageSizes: [30,50,100],
			            paginationPageSize: 30,
			            enableRowSelection: true,
			            enableSelectAll: true,
			            selectionRowHeaderWidth: 35,
			            rowHeight: 35,
			            showGridFooter:false,
			            showColumnFooter: false,
                        useExternalPagination: true,
                        enableMinHeightCheck:true,
                        paginationTemplate:'common/templates/pagination.html'
                        
                    },options);
            return gridOptions;
        }
        return {
            create: function(scope,options) {
                if(!!scope.gridOptions){
                    return;
                }
                
            	scope.gridOptions=createGrid(options);
                scope.gridOptions.onRegisterApi=function(gridApi){
                    scope.gridApi = gridApi;
                    scope.gridApi.pagination.fetch=function(currentPage, pageSize,sortColumns){
                        if(typeof(scope.getPagingList)==="function"){
                            scope.gridApi.pagination.isLoading=true;
                            scope.getPagingList(currentPage, pageSize,sortColumns).then(function(data){
                                scope.gridOptions.data=data.items;
                                scope.gridOptions.totalItems=data.count;
                                scope.gridApi.pagination.isLoading=false;
                            });
                        }
                        
                    };
                    scope.gridApi.core.on.sortChanged(scope, function(grid, sortColumns){
                        scope.sortCols=[];
                        angular.forEach(sortColumns,function(col){
                            scope.sortCols.push(col.name);
                        });
                        scope.gridApi.pagination.fetch(scope.gridApi.pagination.getPage(),scope.gridOptions.paginationPageSize,scope.sortCols)
                    });
                    scope.gridApi.pagination.on.paginationChanged(scope, scope.gridApi.pagination.fetch);
                    if(!!options.fetchData){
                        scope.gridApi.pagination.fetch(scope.gridApi.pagination.getPage(),scope.gridOptions.paginationPageSize);
                    }
                }
            },
            refresh: function(scope) {
               scope.gridApi.pagination.fetch(scope.gridApi.pagination.getPage(),scope.gridOptions.paginationPageSize,scope.sortCols);
            }
        };
    }

    return [GridService];
});

 