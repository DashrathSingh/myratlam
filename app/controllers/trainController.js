'use strict';
app.controller('trainController', ['$scope', 'localStorageService', '$location', 'authService', 'ngAuthSettings', function ($scope, localStorageService, $location, authService, ngAuthSettings) {


    $scope.GetTrainTimings = function () {
        $scope.isload = true;
        $.ajax({
            url: serviceBase + "/api/TrainTimings",
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {

           

                $scope.isload = false;

                debugger;
                $scope.TrainTimings = result;

                $scope.$apply();
                console.log($scope.TrainTimings);


             

            },
            error: function (req) {
                $scope.isload = false;
            },
            complete: function () {

                $scope.isload = false;
            }
        });
    }
    $scope.GetTrainTimings();
   
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
