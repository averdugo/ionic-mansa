angular.module('starter')
 .controller('OwnController', function($scope, $parse,$stateParams, $http, $ionicLoading, $ionicModal, $cordovaBarcodeScanner) {

   $ionicLoading.show({
      template: '<ion-spinner icon="ripple"></ion-spinner>'
   });

    $ionicModal.fromTemplateUrl('templates/createCupon.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    var own = JSON.parse(localStorage.getItem('owner'));
    console.log(own);

    $scope.qrG = function() {
        var device = localStorage["device_id"];
        var id= $stateParams.cuponId;
        var qrcode = JSON.stringify({c: id, d: device});
        $scope.string =qrcode;
        $scope.modal.show();
    };

    $scope.closeqrG = function() {
        $scope.modal.hide();
    };


    $scope.saveQr = function(a,b,c,d) {
        console.log(a+" "+b+" "+c+" "+d);
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
          alert("Cupon Guardado");
          a = JSON.parse(localStorage.getItem('cupones'));
        }

        a.push(sCupon);
        localStorage.setItem('cupones', JSON.stringify(a));

        $scope.modal.hide();
    };



          $ionicLoading.hide();
      
});
