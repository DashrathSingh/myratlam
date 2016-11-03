'use strict';
app.controller('detailController', ['$scope', 'localStorageService', '$location', 'authService', 'ngAuthSettings', function ($scope, localStorageService, $location, authService, ngAuthSettings) {


  
    function CheckScopeBeforeApply() {
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };




    $scope.Currentshop = localStorageService.get("detail");

 

    console.log($scope.Currentshop);
   
   
}]);
