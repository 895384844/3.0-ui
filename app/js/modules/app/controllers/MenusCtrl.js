define(function () {
	return ['$scope', 'MENU_GROUPS', 'SectionsService', MenusCtrl];

	function MenusCtrl($scope, menuGroups, SectionsService) {
		$scope.menus = menuGroups;
		$scope.addSection = function (section) {
            SectionsService.addActiveSection(section);
       };
	}
});