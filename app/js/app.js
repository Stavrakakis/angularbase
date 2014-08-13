(function() {

    'use strict';


    angular.module('app.controllers', []);
    angular.module('app.factories', []);
    angular.module('app.settings', []);
    angular.module('app.services', ['ngCookies', 'app.providers', 'app.settings']);


    angular.module('app', [
        'ngRoute',
        'ngCookies',
        'app.services',
        'app.factories',
        'app.providers',
        'app.controllers',
        'app.settings'
    ])
        .config(['$routeProvider', 'roleProvider',
            function($routeProvider, roleProvider) {

                var roles = roleProvider.$get();

                $routeProvider
                    .when('/', {
                        templateUrl: 'partials/dashboard.html',
                        controller: 'Dashboard',
                        controllerAs: 'vm',
                        access: roles.accessLevels.user
                    });

                $routeProvider.when('/login', {
                    templateUrl: 'partials/login.html',
                    controller: 'Login',
                    controllerAs: 'vm',
                    access: roles.accessLevels.public
                });

                $routeProvider.when('/admin', {
                    templateUrl: 'partials/admin.html',
                    controller: 'Admin',
                    controllerAs: 'vm',
                    access: roles.accessLevels.admin
                });


                $routeProvider.otherwise({
                    redirectTo: '/'
                });
            }
        ])
        .run(['$rootScope', '$location', 'Authorization',
            function($rootScope, $location, Authorization) {

                $rootScope.$on('$routeChangeStart', function(event, next, current) {

                    if (!Authorization.authorize(next.access)) {

                        $rootScope.error = "Seems like you tried accessing a route you don't have access to...";

                        if (Authorization.isLoggedIn()) {
                            $location.path('/');
                        } else {
                            $rootScope.error = null;
                            $location.path('/login');
                        }
                    }

                });
            }
        ]);



})();
