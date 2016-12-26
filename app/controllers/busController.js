'use strict';
app.controller('busController', ['$scope', 'localStorageService', '$location', 'authService', 'ngAuthSettings', function ($scope, localStorageService, $location, authService, ngAuthSettings) {


    $scope.GetBusTimings = function () {
        $scope.isload = true;
        $.ajax({
            url: serviceBase + "/api/BusTimings",
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {

                $scope.isload = false;

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

app.filter('unique', function () {
    return function (collection, keyname) {
        var output = [],
            keys = [];

        angular.forEach(collection, function (item) {
            var key = item[keyname];
            if (keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });

        return output;
    };
});
