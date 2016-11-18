'use strict';
app.controller('loginController', ['$scope','localStorageService', '$location', 'authService', 'ngAuthSettings', function ($scope,localStorageService, $location, authService, ngAuthSettings) {


    $scope.categories = [];
    $scope.filterArray = [];
    $scope.Searchstring = "";
    $scope.sortCol = "CreatedDate";
    $scope.sortDir = "desc";
    var _pageSize = 30;
    $scope.CurrentPage = 1;
    $scope.TotalPages = 0;
    $scope.TotalRecords = 0;
    $scope.CurrentRecordCount = 0;
    $scope.ImageList = [];
    var FileName = "";
    var StreamData = "";
    function CheckScopeBeforeApply() {
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    $scope.isload = true;



    $scope.Category = { ID: 0, Name: "", Status: "", Sort: "", ImageSrc: "" }
    $scope.GetCategories = function () {

        $scope.isload = true;
        var _myObject = { pagenumber: $scope.CurrentPage, sortCol: $scope.sortCol, sortDir: $scope.sortDir, filterArray: $scope.filterArray, Searchstring: $scope.Searchstring, pagesize: _pageSize };
        $.ajax({
            url: serviceBase + "/api/Categories/GetAllCategories",
            data: JSON.stringify(_myObject),
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {

                debugger;

               

                $scope.isload = false;
                if (result.Success) {
                    $scope.categories = result.Data;
                    $scope.CurrentPage = result.CurrentPage;
                    $scope.TotalPages = result.TotalPages;
                    $scope.TotalRecords = result.TotalRecords;
                    $scope.CurrentRecordCount = result.CurrentRecordCount;
                }
                else {
                    // toastr.error("Error occurred");
                    //  toastr.error(result.ex);
                }

                CheckScopeBeforeApply();

            },
            error: function (req) {
            },
            complete: function () {


            }
        });
    }

    $scope.InIt = function ()
    {

        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            slidesPerView: 'auto',
            autoplay: 3000,
            autoplayDisableOnInteraction: false,
          
        });

        $scope.GetCategories();


    }

    $scope.darshan = function () {
        $location.path('/darshan');
        $scope.$apply();
    }


    $scope.gotoshop = function (ID) {
        $("#toolbar").show();
        $scope.caID = ID;
        localStorageService.set("CatID", $scope.caID);
        $location.path('/shop');
        $scope.$apply();
    }

    $scope.InIt();

    $scope.listview = false;
    $scope.gridview = true;

    $scope.showheader = function () {

        $(".searcharea").hide();
        $("#toolbar").show();

    }

    $scope.showlist = function () {
        $scope.gridview = false;
        $scope.listview = true;
       
    }

    $scope.showgrid = function () {
        $scope.gridview = true;
        $scope.listview = false;

    }

    

    $scope.login = function ()
    {
        
        localStorageService.set("ActivityCart", "");

        localStorageService.set("SelectedAction", "");
        localStorageService.set("lastlogindata", "");


        authService.login($scope.loginData).then(function (response)
        {
           
            $scope.GetProfileData();
            //$location.path('/FindItems');
            $location.path('/Accounts');
            
        },
         function (err) {
             $scope.message = err.error_description;
             playBeep();
         });
    };

   
   
}]);
