angular.module('starter.controllers', ['ngOpenFB'])

    .controller('AppCtrl', function($scope, $http, $ionicModal, $timeout, ngFB, $ionicLoading,$cordovaBarcodeScanner) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
        if (window.localStorage['user']&&window.localStorage['device_id'])
        {
            var username = JSON.parse(localStorage["user"]);
            if (!username.id) {
                username.foto="img/icon.png"
            }else {
                username.foto="http://graph.facebook.com/"+username.id+"/picture?width=270&height=270"
            }
            $scope.user=username;

        }


        $ionicModal.fromTemplateUrl('templates/login.html',
        {
            scope: $scope
        }).then(function(modal)
        {
            $scope.modal = modal;
        });



        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        $scope.loginData = {};
        if (window.localStorage['owner'])
        {
            var owner = JSON.parse(localStorage["owner"]);
            $scope.loginData={email:owner.email};

        }
        $scope.login = function() {
            $scope.modal.show();
        };

        $scope.doLogin = function() {

            $http({
                
                method: 'POST',
                data: $scope.loginData,
                headers: {'Content-Type': 'application/json'},
                url: Server+"user/login"
            }).then(function successCallback(response) {
                ownerData = JSON.stringify(response.data)
                localStorage.setItem("owner", ownerData);
                location.href="#/app/own";
                $scope.modal.hide();
            }, function errorCallback(response) {
                console.log(response)
            });

        };

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
            var data = {'email':$scope.loginData.email}

            data=JSON.stringify(data)
            $http({
                method: 'PUT',
                url: Server+"device/",
                headers: {'Content-Type': 'application/json'},
                data: data,
            }).then(function successCallback(data) {
                localStorage.setItem("device_id", data.data.device_id);
                localStorage["user"] = JSON.stringify($scope.loginData);
                var storedUser = JSON.parse(localStorage["user"]);
                location.href="#/app/cupons";
                $ionicLoading.hide();
            }, function errorCallback(response) {
                console.log(response)
                $ionicLoading.hide();
            });
        };

        $scope.fbLogin = function () {
            $ionicLoading.show({
                template: '<ion-spinner icon="ripple"></ion-spinner>'
            })
            ngFB.login({scope: 'email,public_profile,user_likes'})
                .then(function (response) {
                    if (response.status === 'connected')
                    {
                        ngFB.api({
                            path: '/me',
                            params: {fields: 'id,name,email'}
                        }).then(function (user) {
                            $scope.user = user;
                            data =  {'email':user.email}
                            $http({
                                method: 'PUT',
                                url: Server+"device/",
                                headers: {'Content-Type': 'application/json'},
                                data: data,
                            }).then(function successCallback(data) {
                                console.log(data);
                                localStorage.setItem("device_id", data.data.device_id);
                                localStorage["user"] = JSON.stringify( $scope.user );
                                location.href="#/app/cupons";
                                $ionicLoading.hide();
                            }, function errorCallback(response) {
                                console.log(response)
                                $ionicLoading.hide();
                            });
                        },
                        function (error) {
                            console.log(error);
                            $ionicLoading.hide();
                        });
                    } else {
                        alert('Facebook login failed');
                        $ionicLoading.hide();
                    }
                });
        };

        $scope.MyCupon= function(){
            $ionicLoading.show({
                template: '<ion-spinner icon="ripple"></ion-spinner>'
            })
            if (!window.localStorage['cupones'])
            {
                $ionicLoading.show({
                    template: '<div class="alertL"><h1>UPS!</h1><p>NO TIENES CUPONES</p></div>',
                    duration: 6000
                });
                //location.href="#/app/cupons";
            }else
            {
                location.href="#/app/mcupons"
                $ionicLoading.hide();
            }
        }

        $scope.out=function(){
            navigator.app.exitApp();
        }

    })
