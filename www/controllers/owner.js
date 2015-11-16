angular.module('starter')
    .controller('OwnController', function($scope, $parse,$stateParams, $http, $ionicLoading, $ionicModal, $cordovaBarcodeScanner,Camera) {

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
        var store_id = own.stores[0].id;
        console.log($scope.owner);

        $http.get(Server+"cupon?s="+store_id).success(function (data) {
            console.log(data);
            $scope.cupons=data;
            $ionicLoading.hide();
        }).error(function (err) {
            console.log(err);
        });

        $scope.create = function() {
            $scope.modal.show();
        };

        $scope.closeCuponM = function() {
            $scope.modal.hide();
        };

        $scope.leerQr=function(){
            $cordovaBarcodeScanner.scan().then(function(barcodeData){
                console.log(barcodeData);
                $http({
                    method: 'PUT',
                    data: barcodeData,
                    headers: {'Content-Type': 'application/json'},
                    url: Server+"redemption/"
                }).then(function successCallback(response) {
                    alert("Cupon valido");
                    $scope.modal.hide();
                }, function errorCallback(response) {
                    console.log(response)
                });
            },function(error){
                console.log(error);
            });
        }

        $scope.cuponData = {};

        $scope.getPhoto = function() {
            Camera.getPicture().then(function(imageURI) {
                console.log(imageURI);
            }, function(err) {
                console.err(err);
            });
        };

        $scope.doCupon=function(){
            $scope.cuponData.store_id =store_id;

            $http({
                method: 'PUT',
                data:     $scope.cuponData,
                headers: {'Content-Type': 'application/json'},
                url: Server+"cupon/"
            }).then(function successCallback(data) {
                console.log(data);
                $scope.modal.hide();
            }, function errorCallback(response) {
                console.log(response)
            });
        }
          $ionicLoading.hide();

});
