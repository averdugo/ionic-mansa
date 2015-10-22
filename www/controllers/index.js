angular.module('starter')

  .controller('IndexController', function ($scope) {
        $cordovaGeolocation
             .getCurrentPosition(posOptions)
             .then(function (position) {
                   var lat  = position.coords.latitude
                   var long = position.coords.longitude

                   $http.get(Server+"cupon?lat="+lat+"&lon="+long+"&maxdist=5000").success(function (cupons) {
                         console.log(cupons)
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



  });
