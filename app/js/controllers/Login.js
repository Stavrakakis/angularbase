(function() {

    'use strict';

    var Login = function($location, $rootScope, Authorization, authServer) {

        var vm = this;

        vm.login = function() {

            var user = {
                username: vm.username,
                password: vm.password
            };

            Authorization.login(user, function(res) {
                $location.path('/');
            }, function(err) {
                $rootScope.error = err;
            });

        };
    };


    angular
        .module('app.controllers')
        .controller('Login', ['$location', '$rootScope', 'Authorization', 'authServer', Login]);

})();
