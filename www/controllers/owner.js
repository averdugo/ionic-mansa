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
    $scope.owner = own;
    console.log($scope.owner);

    $scope.create = function() {
        $scope.modal.show();
    };

    $scope.closeCuponM = function() {
        $scope.modal.hide();
    };

    $scope.leerQr=function(){
        $cordovaBarcodeScanner.scan().then(function(barcodeData){
            console.log(barcodeData);
        },function(error){
            console.log(error);
        });
    }

    $scope.doCupon=function(){
        console.log();
    }


          $ionicLoading.hide();

});
