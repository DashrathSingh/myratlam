'use strict';
app.controller('contactController', ['$scope', 'localStorageService', '$location', 'authService', 'ngAuthSettings', function ($scope, localStorageService, $location, authService, ngAuthSettings) {


    setTimeout(function ()
    {
     
        $(".nitesh").removeClass("hide");
        $(".nitesh").addClass("animated bounceInRight");

    }, 500)


    setTimeout(function () {

        $(".krishna").removeClass("hide");
        $(".krishna").addClass("animated bounceInLeft");

    }, 1000)

    setTimeout(function () {

        $(".jayesh").removeClass("hide");
        $(".jayesh").addClass("animated bounceInRight");

    }, 1500)
   
}]);
