'use strict';
app.controller('busController', ['$scope', 'localStorageService', '$location', 'authService', 'ngAuthSettings', function ($scope, localStorageService, $location, authService, ngAuthSettings) {


    $scope.GetBusTimings = function () {
        $scope.isloader = true;
        $.ajax({
            url: serviceBase + "/api/BusTimings",
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {

                $scope.isloader = false;

                debugger;
                $scope.BusTimings = result;
                console.log($scope.BusTimings);

                $scope.$apply();

            },
            error: function (req) {
                $scope.isloader = false;
            },
            complete: function () {

                $scope.isloader = false;
            }
        });
    }

    $scope.GetBusTimings();
   
}]);
