angular.module('starter')

    .controller('CuponsController', function ($scope, $http, $ionicLoading, $ionicModal, ngFB, $ionicSlideBoxDelegate) {

        $ionicLoading.show({
            template: '<ion-spinner icon="ripple"></ion-spinner>'
        });

        $http.get(Server+"slideshow/").success(function (data) {
            $scope.slides = data;
            angular.forEach($scope.slides,function(v,k){
                $scope.slides[k].imagesrc = Server+"image/"+v.image.id;
            });
            $ionicSlideBoxDelegate.update();
        }).error(function (err) {
            console.log('fuck you');
        });

        var posOptions = {timeout: 10000, enableHighAccuracy: true};

        Geolocation
             .getCurrentPosition(posOptions)
             .then(function (position) {
                   var lat  = position.coords.latitude;
                   var long = position.coords.longitude;



                $http.get(Server+"cupon/?lat="+lat+"&lon="+long+"&maxdist=2000").success(function (data) {
                    $scope.cupons=data;

                    angular.forEach($scope.cupons,function(v,k){
                        v.store.distance = Math.round(v.store.distance);
                        v.store.distance = v.store.distance / 1000;
                        if (v.store.logo_id != null) {
                            $scope.cupons[k].logo = Server+"image/"+v.store.logo_id;
                        }
                    });
                    $ionicLoading.hide();
                }).error(function (err) {
                    $ionicLoading.show({
                        template: '<div class="alertL"><h1>¡UPS!</h1><p>NO HAY GPS</p></div>',
                        duration: 6000
                    });

                });
             }, function(err) {
                 $ionicLoading.show({
                     template: 'Lo sentimos, No fue posible conectarse. Verifica tu conexión a internet y vuelve a intentarlo',
                     duration: 3000
                 });
                 console.log(err.message);
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

            Geolocation
                 .getCurrentPosition(posOptions)
                 .then(function (position) {
                     var lat  = position.coords.latitude;
                     var long = position.coords.longitude;
                    var termsin = [
                      $scope.searchData.q2,
                      $scope.searchData.q1
                    ];
                    var terms = [];

                    for (var i = 0; i < termsin.length; i++) {
                        if (termsin[i]) terms.push(termsin[i]);
                    }
                    var q = terms.join(' ');
                    var c = $scope.searchData.c;
                    var p = $scope.searchData.p;
                    var t = $scope.searchData.t;
                    var d = $scope.searchData.dist.value+"000";
                    var g = lat+","+long+","+d;
                    var searchParams="";

                    if (q) {
                        searchParams="q="+q;
                    }
                    if (c) {
                        searchParams.length===0 ? searchParams="" : searchParams=searchParams+"&";
                        searchParams=searchParams+"c="+c;
                    }
                    if (p) {
                        searchParams.length===0 ? searchParams="" : searchParams=searchParams+"&";
                        searchParams=searchParams+"p="+p;
                    }
                    if (t) {
                        searchParams.length===0 ? searchParams="" : searchParams=searchParams+"&";
                        searchParams=searchParams+"t="+t;
                    }

                    searchParams=searchParams+"&g="+g;

                    $http.get(Server+"cupon/?"+searchParams).success(function (data) {
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
            });

            $scope.modal.hide();

        };
        $scope.doRefresh = function() {
            Geolocation
                 .getCurrentPosition(posOptions)
                 .then(function (geo) {

                    var d = "2000";
                    var g = geo.coords.latitude+","+geo.coords.longitude+","+d;
                    $http.get(Server+"cupon/?g="+g).success(function (data) {
                        $scope.cupons=data;
                        angular.forEach($scope.cupons,function(v,k){
                            v.store.distance = Math.round(v.store.distance);
                            v.store.distance = v.store.distance / 1000;
                            //v.store.distance = Math.round(v.store.distance,-1);
                            if (v.store.logo_id != null) {
                                $scope.cupons[k].logo = Server+"image/"+v.store.logo_id;
                            }
                        });
                    })
                    .finally(function() {
                      // Stop the ion-refresher from spinning
                      $scope.$broadcast('scroll.refreshComplete');
                    });
                });
         };
    });
