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
        //console.log($scope.owner);

        $http.get(Server+"cupon?s="+store_id).success(function (data) {
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
                
                if (typeof barcodeData == 'undefined' || typeof barcodeData.text == 'undefined')
                {
                    // Agregar error sobre falta de QR o algo....
                    return;
                }
                
                var parts = barcodeData.text.split(',');
                var cupon_id = parts[0],
                    device_id = parts[1];
                
                $http({
                    method: 'PUT',
                    data: JSON.stringify({
                        c: cupon_id,
                        d: device_id
                    }),
                    headers: {'Content-Type': 'application/json'},
                    url: Server+"redemption/"
                }).then(function successCallback(response) {
                    alert("Cupon valido");
                    $scope.modal.hide();
                }, function errorCallback(response) {
                    alert("Cupon no valido");
                    console.log(response)
                });
            },function(error){
                console.log(error);
            });
        }

        $scope.cuponData = {};

        $scope.getPhoto = function() {
            Camera.
                getPicture({
                    destinationType: 0 // Camera.DestinationType.DATA_URL
                })
                .then(function(imageURI) {
                    $http({
                        method:     'PUT',
                        headers:    {
                            'X-Content-Transfer-Encoding': 'base64'
                        },
                        url:        Server + 'image/',
                        data:       imageURI
                    })
                    .then(function(img) {
                        console.log(img);
                        $scope.cuponData.image_id=img.id;
                    })
                });
        };

        $scope.doCupon=function(){
            $scope.cuponData.store_id =store_id;

            $http({
                method: 'PUT',
                data:    $scope.cuponData,
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
