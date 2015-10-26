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
    };
        $scope.modal.hide();

    $scope.saveQr = function() {
        var uuid = localStorage["device_id"];
        var cupon_id= $stateParams.cuponId;
        var db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS CUPON (uuid VARCHAR, cupon_id INTEGER, is_redimp INTEGER)');
            tx.executeSql('INSERT INTO CUPON (uuid, cupon_id, is_redimp) VALUES (?, ?, 0)',[uuid, cupon_id]);
        });
        $scope.modal.hide();
    };

    $scope.leerQr=function(){
        $cordovaBarcodeScanner.scan().then(function(barcodeData){
            console.log(barcodeData);
        },function(error){
            console.log(error);
        });
    }

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
