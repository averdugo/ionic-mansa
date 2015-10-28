angular.module('starter')

  .controller('mCuponsController', function ($scope, $http, $ionicLoading, $ionicModal, CuponResource, $filter) {
      $scope.string="";



        var cuponStorage= JSON.parse(localStorage["cupones"]);
        var idArray = [];
        $scope.string ="";
        angular.forEach(cuponStorage, function(value,key){
          idArray.push(value.cupon_id);
        })

        CuponResource.getCupon(idArray).then(function(data){
            $scope.codigos=data.data;
        });
      


        $ionicModal.fromTemplateUrl('templates/qrG1.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.modal = modal;
        });

        $scope.qrS = function(id) {
            var device= localStorage["device_id"];
            var single_object = id+","+device;
            $scope.string = single_object;
            $scope.modal.show();
        };

        $scope.closeqrG = function() {
            $scope.modal.hide();
        };


  });
