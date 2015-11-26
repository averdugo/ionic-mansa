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
            //alert("ss");
            var device= localStorage["device_id"];
            var single_object = id +","+device;
            console.log(single_object);

        }

        $scope.qrS = function(id) {
            var device= localStorage["device_id"];
            var single_object = id +","+device;
            $scope.string = single_object;
            $scope.modal.show();
            promise = $interval(function(){ qrRedem(id); }, 5000);
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
