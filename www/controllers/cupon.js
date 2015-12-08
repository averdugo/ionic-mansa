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

    $scope.shareF = function() {

        $cordovaSocialSharing
            .shareViaFacebookWithPasteMessageHint('Tested', null, "http://www.fizerkhan.com/blog/posts/Social-Sharing-in-Ionic-application.html") // Share via native share sheet
            .then(function(result) {
                alert('success');
                console.log(result);
            }, function(err) {
                console.log(err);
            });


    }
    $scope.shareW= function(){
        $cordovaSocialSharing
            .shareViaWhatsApp('Tested', 'http://yamaki.com.co/kla-promo/img/PROMO-KLA-FEB2013-01_r3_c2.jpg' , "http://www.fizerkhan.com/blog/posts/Social-Sharing-in-Ionic-application.html") // Share via native share sheet
            .then(function(result) {
                alert('success');
                console.log(result);
            }, function(err) {
                console.log(err);
            });
    }

    $scope.shareT= function(){
        $cordovaSocialSharing
            .shareViaTwitter('Tested', 'http://yamaki.com.co/kla-promo/img/PROMO-KLA-FEB2013-01_r3_c2.jpg' , "http://www.fizerkhan.com/blog/posts/Social-Sharing-in-Ionic-application.html") // Share via native share sheet
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


    $scope.saveQr = function(a,b,c,d) {
        var uuid = localStorage["device_id"];
        var sCupon = {
          "uuid" : uuid,
          "cupon_id" : a,
          "desc" : b,
          "price" : c,
          "address" : d
        }

        var a = [];
        if (localStorage.getItem('cupones')) {
          $ionicLoading.show({
              template: '<div class="alertL"><h1>Cupón Guardado</h1><p>Muestra este cupón en el local establecido y disfruta de esta Mansa Promo</p></div>'

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
        $scope.cupon=data.data;
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
