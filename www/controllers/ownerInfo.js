angular.module('starter')
    .controller('OwnInfoController', function($scope, $parse,$stateParams, $http, $ionicLoading, $ionicModal, $cordovaBarcodeScanner,Camera) {



        $ionicModal.fromTemplateUrl('templates/createCupon.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        var own = JSON.parse(localStorage.getItem('owner'));
        $scope.owner = own;
        var store_id = own.stores[0].id;
        console.log($scope.owner);
        //console.log($scope.owner);

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
                    $ionicLoading.show({
                        template: '<div class="alertL"><h1>GENIAL</h1><p>CUPON VALIDO</p></div>',
                        duration: 6000
                    });
                    $scope.modal.hide();
                }, function errorCallback(response) {
                    $ionicLoading.show({
                        template: '<div class="alertL"><h1>¡UPS!</h1><p>CUPON NO VALIDO</p></div>',
                        duration: 6000
                    });
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
});
