angular.module('starter')
    .controller('StoreCtrl', function($scope, $parse, $stateParams, $http, $ionicLoading) {

        $ionicLoading.show({
            template: '<ion-spinner icon="ripple"></ion-spinner>'
        });

        var id= $stateParams.storeId;

        $http({
            method: 'GET',
            url: Server+"cupon/?s="+id
        }).then(function successCallback(data) {
            $scope.cupons=data.data;
            $ionicLoading.hide();
        }, function errorCallback(response) {
            console.log(response)
        });

        $scope.back=function(){
            location.href="#/app/stores";
        }

});
