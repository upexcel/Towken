(function(){
	'use strict';
	angular.module("scale")
	.controller("accountController", accountController);
	function accountController(localStorageService, SelectedTowkensCount, CountTowken, $rootScope){
       var self=this;
       $rootScope.isActiveFooter='account';
       self.ProfilePic=localStorageService.get('UserPic');
       self.UserName = localStorageService.get('UserToken').name;
       self.email = localStorageService.get('UserEmail');
       self.ChekedIn = localStorageService.get('ChekedIn');
       CountTowken.SelectedTowkenCountApi().then(function(response){
       	 self.TotalTowkenAdd = response.data.selectedTowkensCount;
         self.points = response.data.user_points;
         self.AccountType = CountTowken.DecideUseType(response);
       });
	}
})();