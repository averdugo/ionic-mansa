angular.module('starter')

  .controller('CuponsController', function ($scope, $http, $ionicLoading, $ionicModal, $cordovaGeolocation) {
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
                               template: 'No Se encuentra Geolocalizacion',
                               duration: 3000
                         });
                   });


             }, function(err) {
           // error
       });
       $ionicModal.fromTemplateUrl('templates/search1.html', {
         scope: $scope
       }).then(function(modal) {
         $scope.modal = modal;
       });

       $scope.search = function() {
         $scope.modal.show();
       };
       $scope.closeSearch = function() {
         $scope.modal.hide();
       };

  });
