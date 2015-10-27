var app = angular.module('starter')
    .factory('CuponResource', function($http, $q) {
        var factory={};
        var cupon={};

        return {
            getCupon: function (id) {
                id.join(',');
                var deferred = $q.defer();
                $http.get(Server+"cupon/"+ id).then(function(data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            }
        };
          /* keep going */
          return factory;
    });
