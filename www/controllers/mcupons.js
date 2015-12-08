angular.module('starter')

  .controller('mCuponsController', function ($scope, $http, $ionicLoading, $ionicModal, CuponResource, $filter, $interval) {

        $scope.string="";
        $scope.rate = 3;
        $scope.max = 5;

        var cuponStorage= JSON.parse(localStorage["cupones"]);
        var promise;
        $scope.codigos=cuponStorage;

        $ionicModal.fromTemplateUrl('templates/qrG1.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.modal = modal;
        });
        $ionicModal.fromTemplateUrl('templates/ranking.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.modal2 = modal;
        });

        function qrRedem(id){
            var device= localStorage["device_id"];
            $http({
                method: 'GET',
                url: Server+"redemption/?cupon_id="+id+"&device_id="+device
            }).then(function successCallback(data) {
                console.log(data);
                if (data.data.length >= 1) {
                    $ionicLoading.show({
                        template: '<div class="alertL"><h1>GENIAL!</h1><p>CUPON CANJEADO</p></div>',
                        duration: 6000
                    });
                    var cuponStorage= JSON.parse(localStorage["cupones"]);
                    for (var i = 0; i < cuponStorage.length; i++) {
                        if (cuponStorage[i].cupon_id == id) {
                            cuponStorage[i].is_redeemed = true;
                            break;
                        }
                    }
                    localStorage.cupones = JSON.stringify(cuponStorage);
                    $scope.closeqrG();
                    $scope.ranking();
                }
            }, function errorCallback(response) {
                $ionicLoading.show({
                    template: '<div class="alertL"><h1>¡UPS!</h1><p>CUPON NO VALIDO</p></div>',
                    duration: 6000
                });
                console.log(response)
            });




        }

        $scope.qrS = function(id) {
            var device= localStorage["device_id"];
            var single_object = id +","+device;
            $scope.string = single_object;
            $scope.modal.show();
            promise = $interval(function(){ qrRedem(id); }, 4000);
        };

        $scope.closeqrG = function() {
            $scope.modal.hide();
            $interval.cancel(promise);
        };

        $scope.ranking = function() {
            $scope.modal2.show();
        };

        $scope.rating = {};

        $scope.doRate= function(){
            console.log($scope.rating);
        }
  });
