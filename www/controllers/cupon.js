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
        var qrcode = JSON.stringify({c: id, d: device});
        $scope.string =qrcode;
        $scope.modal.show();
    };

    $scope.closeqrG = function() {
        $scope.modal.hide();
    };


    $scope.saveQr = function() {
        var uuid = localStorage["device_id"];
        var cupon_id= $stateParams.cuponId;
        var sCupon = {
          "uuid" : uuid,
          "cupon_id" : cupon_id
        }

        var a = [];
        if (localStorage.getItem('cupones')) {
          alert("ok");
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
