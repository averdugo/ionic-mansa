angular.module('starter')
 .controller('CuponCtrl', function($scope, $parse,$stateParams, $http, $ionicLoading, $ionicModal, $cordovaBarcodeScanner, uiGmapGoogleMapApi) {

   $ionicLoading.show({
      template: '<ion-spinner icon="ripple"></ion-spinner>'
   });

    $ionicModal.fromTemplateUrl('templates/qrG.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.string ="";
    var id= $stateParams.cuponId;



    $scope.qrG = function(id) {
        var device = localStorage["device_id"];
        var id= $stateParams.cuponId;
        var qrcode = JSON.stringify({cupon_id: id, device_id: device});
        $scope.string =qrcode;
        $scope.modal.show();
    };

    $scope.closeqrG = function() {
        $scope.modal.hide();
    };


    $scope.saveQr = function(a,b,c,d) {
        var uuid = localStorage["device_id"];
        var sCupon = {
          "uuid" : uuid,
          "cupon_id" : a,
          "desc" : b,
          "price" : c,
          "address" : d
        }

        var a = [];
        if (localStorage.getItem('cupones')) {
          alert("Cupón Guardado en Mis Cupones: Muestra este cupón en el local establecido y disfruta de esta Mansa Promo");
          a = JSON.parse(localStorage.getItem('cupones'));
        }

        a.push(sCupon);
        localStorage.setItem('cupones', JSON.stringify(a));

        $scope.modal.hide();
    };

    $scope.getChecks = function(id){
        $http({
            method: 'GET',
            url: Server+"redemption/"+id
        }).then(function successCallback(data) {
            console.log(data);
        }, function errorCallback(response) {
            console.log(response)
         });
    }

    $http({
        method: 'GET',
        url: Server+"cupon/"+id
    }).then(function successCallback(data) {
        $scope.cupon=data.data;
        $scope.map = { center: { latitude: $scope.cupon.store.coordinates.lat, longitude: $scope.cupon.store.coordinates.lon }, zoom: 18 };
        $scope.coords={center:{latitude:$scope.cupon.store.coordinates.lat,longitude:$scope.cupon.store.coordinates.lon}};
        //getChecks($scope.cupon.id);
        $ionicLoading.hide();
    }, function errorCallback(response) {
        $ionicLoading.show({
            template: 'Lo sentimos, No fue posible conectarse. Verifica tu conexión a internet y vuelve a intentarlo',
            duration: 3000
        });
        console.log(response)
     });


});
