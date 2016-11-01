
var app = angular.module('ClearlyInventoryApp', ['ngRoute', 'ngSanitize', 'LocalStorageModule', 'angular-loading-bar', 'ngCordova', 'ui.sortable']);

app.config(function ($routeProvider) {

  

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "app/views/login.html"
    });

    $routeProvider.when("/shop", {
        controller: "shopController",
        templateUrl: "app/views/shop.html"
    });



    $routeProvider.otherwise({ redirectTo: "/login" });

});

//var serviceBase = 'http://localhost:7440/API/ClearlyInventoryAPI.svc/';
//var serviceBaseUrl = 'http://localhost:7440/';
//var serviceBaseUrl = 'https://test.inventory4.com/';
var serviceBase = 'http://nm.sproutsmind.in/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});


app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);

// factory for all messages 
app.factory('log', function () {
    toastr.options = {
        closeButton: true,
        positionClass: 'toast-top-right',
    };
    return {
        success: function (text) {
            toastr.success(text, "Success");
        },
        error: function (text) {
            toastr.error(text, "Error");
        },
        info: function (text) {
            toastr.info(text, "Info");
        },
        warning: function (text) {
            toastr.warning(text, "Warning");
        },
    };
});


