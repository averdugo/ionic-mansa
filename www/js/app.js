const Server="http://skizzordz.exis.cl:8000/";
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires',[]
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ngCordova', 'ngOpenFB','ja.qr'])

    .run(function($ionicPlatform, ngFB) {
      ngFB.init({appId: '869739519812527'});
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
      });
    })


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
      .state('app.inicio', {
          url: '/inicio',
          views: {
              'menuContent': {
                  templateUrl: 'templates/inicio.html'
              }
          }
      })
      .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'AppCtrl'
      })

      .state('app.search', {
          url: '/search',
          views: {
              'menuContent': {
                  templateUrl: 'templates/search.html'
              }
          }
      })

      .state('app.browse', {
          url: '/browse',
          views: {
              'menuContent': {
                  templateUrl: 'templates/browse.html'
              }
          }
        })

      .state('app.cupons', {
          url: '/cupons',
          views: {
              'menuContent': {
                  templateUrl: 'templates/cupons.html',
                  controller: 'CuponsController'
              }
          }
      })
      .state('app.mcupons', {
          cache: false,
          url: '/mcupons',
          views: {
              'menuContent': {
                  templateUrl: 'templates/mcupons.html',
                  controller: 'mCuponsController'
              }
          }
      })
      .state('app.stores', {
          url: '/stores',
          views: {
              'menuContent': {
                  templateUrl: 'templates/stores.html',
                  controller: 'StoresController'
              }
          }
      })
      .state('app.own', {
          url: '/own',
          views: {
              'menuContent': {
                  templateUrl: 'templates/owner.html',
                  controller: 'OwnController'
              }
          }
      })

      .state('app.cupon', {
        url: '/cupon/:cuponId',
        views: {
              'menuContent': {
                  templateUrl: 'templates/cupon.html',
                  controller: 'CuponCtrl'
              }
        }
      });


  // if none of the above states are matched, use this as the fallback
  if (window.localStorage['user']&&window.localStorage['device_id']) {
    $urlRouterProvider.otherwise('/app/cupons');

  }else {
      $urlRouterProvider.otherwise('/app/inicio');
  }

});
