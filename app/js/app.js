(function() {

    'use strict';

    // Declare app level module which depends on filters, and services
    angular.module('app', [
        'ngRoute',
        'ngCookies',
        'app.filters',
        'app.services',
        'app.directives',
        'app.controllers',
        'ui.router'
    ])
        .config(['$stateProvider',
            function($stateProvider) {

                $stateProvider
                    .state('public', {
                        template: 'partials/dashboard.html',
                        controller: 'Dashboard',
                        controllerAs: 'vm',
                        data: {
                            access: 'public'
                        }
                    });


            }
        ]);

    angular.module('app.controllers', []);

})();
