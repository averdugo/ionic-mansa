angular.module('starter')

  .controller('mCuponsController', function ($scope, $http, $ionicLoading, $ionicModal, CuponResource, $filter) {

        $scope.string="";

        var cuponStorage= JSON.parse(localStorage["cupones"]);
        $scope.codigos=cuponStorage;

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
