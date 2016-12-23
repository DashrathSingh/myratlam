'use strict';
app.controller('shopController', ['$scope', 'localStorageService', '$location', 'authService', 'ngAuthSettings', function ($scope, localStorageService, $location, authService, ngAuthSettings) {


    $scope.shops = [];
    $scope.Categories = [];
    $scope.filterArray = [];
    $scope.Searchstring = "";
    $scope.sortCol = "ID";
    $scope.sortDir = "asc";
    var _pageSize = 32;
    $scope.CurrentPage = 1;
    $scope.TotalPages = 0;
    $scope.TotalRecords = 0;
    $scope.CurrentRecordCount = 0;
    $scope.CurrentShopID = 0;
    $scope.ShopImages = [];
    $scope.ImageList = [];
    var FileName = "";
    var StreamData = "";
    function CheckScopeBeforeApply() {
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    $scope.isload = true;
    $scope.totalrecord = false;


    $scope.Currentcategory = localStorageService.get("CatID");

    $("#Choosepic").click(function () {
        $("#file").trigger("click");
    })
    $scope.Shop = {
        ID: 0,
        Name: "",

        Address1: "",
        Address2: "",

        Address3: "",

        Contact1: "",
        Contact2: "",

        Contact3: "",

        latitude: "",

        longitude: "",

        Email: "",

        CityID: 2,

        CategoryID: 0,

        Description: "",

        AboutUs: "",

        Status: "",

        IsVerified: true,

        speciality: "",

        OwnerName: "",

        OwnerImageSrc: "",

        Sort: 0,
        AvailableDays: "",

        AvailableTime: "",

        WebsiteUrl: "",

        Rating: 1

        //CreatedDate: "",

        //UpdatedDate: "",

        //RegistrationDate: "",

    }

  
 
    $scope.GetShops = function () {

     
        var _myObject = { IsMobile: true, categoryID: $scope.Currentcategory, categoryName: "", pagenumber: $scope.CurrentPage, sortCol: $scope.sortCol, sortDir: $scope.sortDir, filterArray: $scope.filterArray, Searchstring: $scope.Searchstring, pagesize: _pageSize };
        $.ajax({
            url: serviceBase + "/api/Shops/GetAllShops",
            data: JSON.stringify(_myObject),
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {
                $scope.isload = false;

                debugger;
                if (result.Success) {
                    $scope.shops = result.Data;
                    $scope.CurrentPage = result.CurrentPage;
                    $scope.TotalPages = result.TotalPages;
                    $scope.TotalRecords = result.TotalRecords;
                    $scope.CurrentRecordCount = result.CurrentRecordCount;
                    $scope.totalrecord = false;
                    if ($scope.shops.length==0) {
                        $scope.totalrecord = true;
                        $scope.$apply();
                    }

                    $scope.categaryname = result.Data[0].categoryName;
                    CheckScopeBeforeApply();
                 
                    console.log($scope.shops.length)
                }
                else {
                    toastr.error("Error occurred");
                    toastr.error(result.ex);
                }

                CheckScopeBeforeApply();

            },
            error: function (req) {
                $scope.isload = false;
            },
            complete: function () {
                $scope.isload = false;


            }
        });
    }


    $scope.gotodetail = function(obj) {
        localStorageService.set("detail", obj);
        $location.path('/detail');
        $scope.$apply();
    }

   
    $scope.ChangePage = function (Type) {
        if (Type == 1) {
            $scope.CurrentPage = $scope.CurrentPage + 1;
        } else {
            $scope.CurrentPage = $scope.CurrentPage - 1;

        }
        CheckScopeBeforeApply();
        $scope.GetShops();
    }
    $scope.sortByCol = function (sortCol) {
        $scope.sortCol = sortCol;
        if ($scope.sortDir == "asc") {
            $scope.sortDir = "desc";

        }
        else {
            $scope.sortDir = "asc";
        }
        CheckScopeBeforeApply();
        $scope.GetShops();
    }


    $scope.range = function () {

        var rangeSize = 4;

        if (rangeSize > $scope.TotalPages) {
            rangeSize = $scope.TotalPages;
        }

        var ps = [];

        var start;

        start = $scope.CurrentPage;

        if (start > $scope.TotalPages - rangeSize) {

            start = $scope.TotalPages - rangeSize + 1;

        }

        for (var i = start; i < start + rangeSize; i++) {

            ps.push(i);

        }

        return ps;

    };


    $scope.prevPage = function () {

        if ($scope.CurrentPage > 1) {

            $scope.CurrentPage--;
            CheckScopeBeforeApply();

            $scope.GetShops();

        }
    };


    $scope.DisablePrevPage = function () {

        return $scope.CurrentPage === 1 ? "disabled" : "";

    };

    $scope.OpenShopImages = function (_obj) {
        $scope.CurrentShopID = _obj.ID;
        $scope.ShopImages = [];
        if (_obj.Images != null && _obj.Images != undefined && _obj.Images.length > 0) {

            $scope.ShopImages = _obj.Images;
        }
        CheckScopeBeforeApply();
        $("#myModalImages").modal('show');

    }


    $scope.nextPage = function () {

        if ($scope.CurrentPage < $scope.TotalPages) {

            $scope.CurrentPage++;
            CheckScopeBeforeApply();

            $scope.GetShops();

        }
    };


    $scope.DisableNextPage = function () {

        return $scope.CurrentPage === $scope.TotalPages ? "disabled" : "";

    };

  
    $scope.setPage = function (n) {

        $scope.CurrentPage = n;
        CheckScopeBeforeApply();

        $scope.GetShops();

    };

    $scope.GetShops();

   

  
   
   
}]);
