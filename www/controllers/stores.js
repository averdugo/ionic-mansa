angular.module('starter')

  .controller('StoresController', function ($scope, $http, $ionicLoading, $cordovaGeolocation) {
        $ionicLoading.show({
           template: '<ion-spinner icon="ripple"></ion-spinner>'
        });
        var posOptions = {timeout: 10000, enableHighAccuracy: true};

        $cordovaGeolocation
             .getCurrentPosition(posOptions)
             .then(function (position) {
                   var lat  = position.coords.latitude
                   var long = position.coords.longitude

                   $http.get(Server+"store/?lat="+lat+"&lon="+long+"&maxdist=4000").success(function (data) {
                        $scope.stores=data;
                        $ionicLoading.hide();
                   }).error(function (err) {
                       $ionicLoading.show({
                           template: '<div class="alertL"><h1>¡UPS!</h1><p>NO HAY GPS</p></div>',
                           duration: 6000
                       });
                   });


             }, function(err) {
           // error
       });



  });
