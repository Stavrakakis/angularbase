(function() {

    'use strict';

    // Declare app level module which depends on filters, and services
    angular.module('app', [
        'ngRoute',
        'app.filters',
        'app.services',
        'app.directives',
        'app.controllers'
    ])
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.when('/dashboard', {
                    templateUrl: 'partials/dashboard.html',
                    controller: 'Dashboard',
                    controllerAs: 'vm'
                });
                $routeProvider.when('/account', {
                    templateUrl: 'partials/account.html',
                    controller: 'Account',
                    controllerAs: 'vm'
                });
                $routeProvider.otherwise({
                    redirectTo: '/'
                });
            }
        ]);

    angular.module('app.controllers', []);

})();
