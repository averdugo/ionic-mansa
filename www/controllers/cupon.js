angular.module('starter')
 .controller('CuponCtrl', function($scope, $cordovaSocialSharing, $parse,$stateParams, $http, $ionicLoading, $ionicModal, $cordovaBarcodeScanner, uiGmapGoogleMapApi) {

   $ionicLoading.show({
      template: '<ion-spinner icon="ripple"></ion-spinner>'
   });

    $ionicModal.fromTemplateUrl('templates/qrG.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.string ="";
    var id= $stateParams.cuponId;
    var dia = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado']

    $scope.shareF = function(a) {

        var message = a.description+" "+a.price;
        var url = 'http://cupon.mansapromo.cl/cupon/view/'+a.id;
        $cordovaSocialSharing
            .shareViaFacebookWithPasteMessageHint(message, null, url) // Share via native share sheet
            .then(function(result) {
                alert('success');
                console.log(result);
            }, function(err) {
                console.log(err);
            });


    }
    $scope.shareW= function(a){
        var message = a.description+" "+a.price;
        var url = 'http://cupon.mansapromo.cl/cupon/view/'+a.id;
        if (a.image_id == null) {
            var img = null
        }else {
            var img = 'http://skizzordz.exis.cl:8000/image/scale/600/600px/'+a.image_id;
        }

        $cordovaSocialSharing
            .shareViaWhatsApp(message, img, url) // Share via native share sheet
            .then(function(result) {
                alert('success');
                console.log(result);
            }, function(err) {
                console.log(err);
            });
    }

    $scope.shareT= function(a){
        var message = a.description+" "+a.price;
        var url = 'http://cupon.mansapromo.cl/cupon/view/'+a.id;
        if (a.image_id == null) {
            var img = null
        }else {
            var img = 'http://skizzordz.exis.cl:8000/image/scale/600/600px/'+a.image_id;
        }
        $cordovaSocialSharing
            .shareViaTwitter('Tested', img, url) // Share via native share sheet
            .then(function(result) {
                alert('success');
                console.log(result);
            }, function(err) {
                console.log(err);
            });
    }



    $scope.qrG = function() {
        var device = localStorage["device_id"];
        var id= $stateParams.cuponId;
        var qrcode = JSON.stringify({cupon_id: id, device_id: device});
        $scope.string =qrcode;
        $scope.modal.show();
    };

    $scope.closeqrG = function() {
        $scope.modal.hide();
    };


    $scope.saveQr = function(a,b,c,d,e) {
        var uuid = localStorage["device_id"];
        var sCupon = {
          "uuid" : uuid,
          "cupon_id" : a,
          "desc" : b,
          "price" : c,
          "address" : d,
          "name" : e
        }

        var a = [];
        if (localStorage.getItem('cupones')) {
          $ionicLoading.show({
              template: '<div class="alertL"><h1>Cupón Guardado</h1><p>Muestra este cupón en el local establecido y disfruta de esta Mansa Promo</p></div>',
              duration: 3000

          });

          a = JSON.parse(localStorage.getItem('cupones'));
        }

        a.push(sCupon);
        localStorage.setItem('cupones', JSON.stringify(a));

        $scope.modal.hide();
    };

    $scope.getChecks = function(id){
        $http({
            method: 'GET',
            url: Server+"redemption/"+id
        }).then(function successCallback(data) {
            console.log(data);
        }, function errorCallback(response) {
            console.log(response)
         });
    }

    $http({
        method: 'GET',
        url: Server+"cupon/"+id
    }).then(function successCallback(data) {

        var horario = data.data.store.hours;
        $scope.cupon=data.data;
        console.log(data.data);
        $scope.cupon.horario=[];
        angular.forEach(horario,function(v,k){
            $scope.cupon.horario.push(dia[v.from]+' a '+ dia[v.to]+' de '+v.open+' hasta '+v.close)
        });
        console.log($scope.cupon.horario);

        $scope.map = { center: { latitude: $scope.cupon.store.coordinates.lat, longitude: $scope.cupon.store.coordinates.lon }, zoom: 16 };
        $scope.coords={center:{latitude:$scope.cupon.store.coordinates.lat,longitude:$scope.cupon.store.coordinates.lon}};
        //getChecks($scope.cupon.id);
        $ionicLoading.hide();
    }, function errorCallback(response) {
        $ionicLoading.show({
            template: '<div class="alertL"><h1>¡UPS!</h1><p>NO HAY INTERNET</p></div>',
            duration: 6000
        });
        console.log(response)
     });


});
