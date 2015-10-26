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
       // Form data for the login modal
       $scope.searchData = {};

       $scope.search = function() {
         $scope.modal.show();
       };
       $scope.closeSearch = function() {
         $scope.modal.hide();
       };
       $scope.doSearch = function() {
         $ionicLoading.show({
            template: '<ion-spinner icon="ripple"></ion-spinner>'
         });

         var q = $scope.searchData.q1
         //var q = $scope.searchData.q1
         var c = $scope.searchData.c
         var p = $scope.searchData.p
         var t = $scope.searchData.t

         $http.get(Server+"cupon?q="+q).success(function (data) {
              $scope.cupons=data;
              $ionicLoading.hide();
         }).error(function (err) {
               $ionicLoading.show({
                     template: 'No Se encuentra Geolocalizacion',
                     duration: 3000
               });
         });

         $scope.modal.hide();

       };
  });
