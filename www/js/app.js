const Server="http://skizzordz.exis.cl:8000/";
//"http://hydra.lan:8000/";
//"http://skizzordz.exis.cl:8000/"
// Ionic Starter App

function handleOpenURL(url) {
  if (url.substr(0, 13) == 'mansapromo://')
  {
    localurl = url.substr(13);
    // go to a cupon
    if (localurl =~ /^app\/cupon\/[a-zA-Z0-9]+$/)
    {
      location.href = '#' + localurl;
    }
  }
}

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires',[]
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','uiGmapgoogle-maps', 'starter.controllers','ngCordova', 'ngOpenFB','ja.qr', 'ionic.rating'])

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
    .config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
        });
    })

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
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
      .state('app.cupons', {
          cache: false,
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
          cache: false,
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
      .state('app.info', {
          url: '/info',
          views: {
              'menuContent': {
                  templateUrl: 'templates/info.html',
                  controller: 'OwnInfoController'
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
      })
      .state('app.store', {
        url: '/store/:storeId',
        views: {
              'menuContent': {
                  templateUrl: 'templates/store.html',
                  controller: 'StoreCtrl'
              }
        }
      });
    // alternatively, register the interceptor via an anonymous factory
    $httpProvider.defaults.withCredentials = true;
    
    $httpProvider.interceptors.push(function($q) {
      return {
       request: function(config) {
           if (localStorage.device_id) {
               config.headers['X-DEVICE-ID'] = localStorage.device_id;
           }
           return config;
        }
      };
    });
  var deviceReady = function() {
    //console.log("DEVICE READY!");
    //if (window.localStorage.user && window.localStorage.device_id) {
      $urlRouterProvider.otherwise('/app/cupons');
    //}else {

    //}
  };


  if (typeof cordova == 'undefined' || cordova.platformId=='browser') {
    deviceReady();
  }
  else {
    //console.log("DEVICE READY?");
    //document.addEventListener('deviceready', deviceReady, false);
    //if (window.localStorage.user && window.localStorage.device_id) {
      $urlRouterProvider.otherwise('/app/cupons');
    //}else {
     // $urlRouterProvider.otherwise('/app/inicio');
    //}
  }
  // if none of the above states are matched, use this as the fallback
});
