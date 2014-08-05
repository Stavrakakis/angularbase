(function() {

    'use strict';


    // Declare app level module which depends on filters, and services
    angular.module('winterflood', [
        'ngRoute',
        'winterflood.filters',
        'winterflood.services',
        'winterflood.directives',
        'winterflood.controllers'
    ])
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.when('/dashboard', {
                    templateUrl: 'partials/partial1.html',
                    controller: 'Dashboard'
                });
                $routeProvider.when('/account', {
                    templateUrl: 'partials/partial2.html',
                    controller: 'Account'
                });
                $routeProvider.otherwise({
                    redirectTo: '/dashboard'
                });
            }
        ]);

    angular.module('winterflood.controllers', []);

})();
