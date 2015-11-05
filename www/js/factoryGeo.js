angular.module('starter')
    .factory('geoFactory', function($http, $q, $cordovaGeolocation) {

        var factory={};
        var geo={};
        var posOptions = {timeout: 10000, enableHighAccuracy: true};

        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                var deferred = $q.defer();
                var lat  = position.coords.latitude
                var long = position.coords.longitude
                geo={
                    'lat':lat,
                    'long':long,
                }

            }, function(err) {
                 //alert(err);
            });

        factory.getGeo=function(){
           return geo;
        }

        return factory;
    });
