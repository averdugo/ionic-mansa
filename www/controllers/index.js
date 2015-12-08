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
                           template: '<div class="alertL"><h1>¡UPS!</h1><p>NO HAY GPS</p></div>',
                           duration: 6000
                       });
                   });


             }, function(err) {
           // error
       });



  });
