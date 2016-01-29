angular.module('starter')
    .controller('StoreCtrl', function($scope, $parse, $stateParams, $http, $ionicLoading,$ionicModal,uiGmapGoogleMapApi) {
        var id= $stateParams.storeId;

        $ionicLoading.show({
            template: '<ion-spinner icon="ripple"></ion-spinner>'
        });
        var dia = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
        $ionicModal.fromTemplateUrl('templates/storeI.html',
        {
            scope: $scope
        }).then(function(modal)
        {
            $scope.modal = modal;
        });
        $scope.closeInfo = function() {
            $scope.modal.hide();
        };
        $scope.info = function() {
            $http({
                method: 'GET',
                url: Server+"store/"+id
            }).then(function successCallback(data) {
                $scope.store=data.data;
                var horario = data.data.hours;
                $scope.store.horario=[];
                if (horario[0]!= "") {
                    angular.forEach(horario,function(v,k){
                            $scope.store.horario.push(dia[v.from]+' a '+ dia[v.to]+' de '+v.open+' hasta '+v.close)

                    });
                }

                $scope.map = { center: { latitude: $scope.store.coordinates.lat, longitude: $scope.store.coordinates.lon }, zoom: 16 };
                $scope.coords={center:{latitude:$scope.store.coordinates.lat,longitude:$scope.store.coordinates.lon}};

            }, function errorCallback(response) {
                console.log(response)
            });
            $scope.modal.show();
        };



        $http({
            method: 'GET',
            url: Server+"cupon/?s="+id
        }).then(function successCallback(data) {
            $scope.cupons=data.data;
            angular.forEach($scope.cupons,function(v,k){
                if (v.store.logo_id != null) {
                    $scope.cupons[k].logo = Server+"image/"+v.store.logo_id;
                }
            });
            $ionicLoading.hide();
        }, function errorCallback(response) {
            console.log(response)
        });

        $scope.back=function(){
            location.href="#/app/stores";
        }

});
