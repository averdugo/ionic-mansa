angular.module('starter')
 .controller('CuponCtrl', function($scope, $parse,$stateParams, $http, $ionicLoading, $ionicModal, $cordovaBarcodeScanner) {

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
          alert("Cupon Guardado");
          a = JSON.parse(localStorage.getItem('cupones'));
        }

        a.push(sCupon);
        localStorage.setItem('cupones', JSON.stringify(a));

        $scope.modal.hide();
    };



    $http({
        method: 'GET',
        url: Server+"cupon/"+id
    }).then(function successCallback(data) {
          $scope.cupon=data.data;
          $ionicLoading.hide();
      }, function errorCallback(response) {
          console.log(response)
      });


});
