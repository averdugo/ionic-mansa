angular.module('starter.controllers', ['ngOpenFB'])

.controller('AppCtrl', function($scope, $http, $ionicModal, $timeout, ngFB, $ionicLoading) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  // Perform the login action when the user submits the login form
  $scope.doLogin2 = function() {
    $ionicLoading.show({
       template: '<ion-spinner icon="ripple"></ion-spinner>'
    });
    var edad="";
    edad = moment().diff($scope.loginData.date, 'years');
    if (edad<18) {
      alert("Esta aplicacion es para mayores de 18 años")
      return false;
    };
    $http({
        method: 'PUT',
        url: Server+"device/"
    }).then(function successCallback(response) {
        localStorage.setItem("device_id", response.data.uuid);
        localStorage["user"] = JSON.stringify($scope.loginData);
        var storedUser = JSON.parse(localStorage["user"]);
        location.href="#/app/playlists";
         $ionicLoading.hide();
      }, function errorCallback(response) {
        console.log(response)
      });


  };

  $scope.fbLogin = function () {
    $ionicLoading.show({
       template: '<ion-spinner icon="ripple"></ion-spinner>'
    })
    ngFB.login({scope: 'email,public_profile,user_likes'}).then(
        function (response) {


            if (response.status === 'connected') {
                ngFB.api({
                   path: '/me',
                   params: {fields: 'id,name,email'}
                }).then(
                   function (user) {
                       $scope.user = user;
                       $http({
                           method: 'PUT',
                           url: Server+"device/"
                       }).then(function successCallback(response) {
                           localStorage.setItem("device_id", response.data.uuid);
                           localStorage["user"] = JSON.stringify( $scope.user );
                           location.href="#/app/playlists";
                            $ionicLoading.hide();
                         }, function errorCallback(response) {
                           console.log(response)
                         });

                   },
                   function (error) {
                       alert('Facebook error: ' + error.error_description);
                   });
            } else {
                alert('Facebook login failed');
            }
        });
};

})

.controller('PlaylistsCtrl', function($scope) {

})

.controller('PlaylistCtrl', function($scope, $parse,$stateParams, $http, $ionicLoading, $ionicModal) {

    var id= $stateParams.cuponId;
    $ionicLoading.show({
       template: '<ion-spinner icon="ripple"></ion-spinner>'
    });
    $http({
        method: 'GET',
        url: Server+"cupon/"+id
    }).then(function successCallback(data) {
        console.log(data.data);
         $ionicLoading.hide();
      }, function errorCallback(response) {
        console.log(response)
      });
});
