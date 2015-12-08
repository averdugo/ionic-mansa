angular.module('starter')

    .controller('CuponsController', function ($scope, $http, $ionicLoading, $ionicModal, ngFB, $cordovaGeolocation,geoFactory) {

        $ionicLoading.show({
            template: '<ion-spinner icon="ripple"></ion-spinner>'
        });

        var posOptions = {timeout: 10000, enableHighAccuracy: true};

        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                var lat  = position.coords.latitude
                var long = position.coords.longitude

                $http.get(Server+"cupon?lat="+lat+"&lon="+long+"&maxdist=10000").success(function (data) {
                    $scope.cupons=data;
                    $ionicLoading.hide();
                }).error(function (err) {
                    $ionicLoading.show({
                        template: '<div class="alertL"><h1>¡UPS!</h1><p>NO HAY GPS</p></div>',
                        duration: 6000
                    });

                });
             }, function(err) {
                $ionicLoading.show({
                    template: '<div class="alertL"><h1>¡UPS!</h1><p>NO HAY INTERNET</p></div>',
                    duration: 6000
                });
             });

        $ionicModal.fromTemplateUrl('templates/search1.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Form data for the login modal
        $scope.searchData = {};

        $scope.search = function() {
            $scope.searchData.dist= {
                min:1,
                max:10,
                value:4
            }

            $scope.modal.show();
        };
        $scope.reload = function() {
            location.reload();
        };

        $scope.closeSearch = function() {
            $scope.modal.hide();
        };


        $scope.doSearch = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="ripple"></ion-spinner>'
            });

            var geo = geoFactory.getGeo();
            if ($scope.searchData.q2 != undefined) {
                var q = $scope.searchData.q2+" "+$scope.searchData.q1;
            }else{
                q = $scope.searchData.q1
            }
            var c = $scope.searchData.c
            var p = $scope.searchData.p
            var t = $scope.searchData.t
            var d = $scope.searchData.dist.value+"000"
            var g = geo.lat+","+geo.long+","+d;
            var searchParams="";

            if (q) {
                searchParams="q="+q;
            }
            if (c) {
                searchParams.length==0 ? searchParams="" : searchParams=searchParams+"&";
                searchParams=searchParams+"c="+c;
            }
            if (p) {
                searchParams.length==0 ? searchParams="" : searchParams=searchParams+"&";
                searchParams=searchParams+"p="+p;
            }
            if (t) {
                searchParams.length==0 ? searchParams="" : searchParams=searchParams+"&";
                searchParams=searchParams+"t="+t;
            }

            searchParams=searchParams+"&g="+g;

            $http.get(Server+"cupon?"+searchParams).success(function (data) {
                document.getElementById('cuponSearch').className="btn-back2sr";
                d=document.getElementById('cuponBack');
                d.className=d.className.replace('btn-back2sr',"");
                if (data===[]) {
                    $ionicLoading.show({
                        template: '<div class="alertL"><h1>¡UPS!</h1><p>NO HAY CUPONES</p></div>',
                        duration: 6000
                    });

                }
                $scope.cupons=data;
                $ionicLoading.hide();
            }).error(function (err) {
                    console.log(err);
                    $ionicLoading.show({
                        template: '<div class="alertL"><h1>¡UPS!</h1><p>NO HAY INTERNET</p></div>',
                        duration: 6000
                    });

            });

            $scope.modal.hide();

        };
        $scope.doRefresh = function() {
            var geo = geoFactory.getGeo();
            var d = "4000";
            var g = geo.lat+","+geo.long+","+d;
            $http.get(Server+"cupon?g="+g).success(function (data) {
                $scope.cupons=data;
            })
            .finally(function() {
              // Stop the ion-refresher from spinning
              $scope.$broadcast('scroll.refreshComplete');
            });
         };
    });
