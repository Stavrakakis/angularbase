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
;(function() {

    'use strict';

    var Account = function() {

    };



    angular
        .module('winterflood.controllers')
        .controller('Account', Account);

})();
;(function() {

    'use strict';

    var Dashboard = function() {

    };


    angular
        .module('winterflood.controllers')
        .controller('Dashboard', Dashboard);

})();
;(function() {

    'use strict';

    /* Directives */


    angular.module('winterflood.directives', [])
        .directive('appVersion', ['version',
            function(version) {
                return function(scope, elm, attrs) {
                    elm.text(version);
                };
            }
        ]);

})();
;(function() {

    'use strict';

    /* Filters */

    angular.module('winterflood.filters', [])
        .filter('interpolate', ['version',
            function(version) {
                return function(text) {
                    return String(text)
                        .replace(/\%VERSION\%/mg, version);
                };
            }
        ]);

})();
;(function() {

    'use strict';

    /* Services */

    // Demonstrate how to register services
    // In this case it is a simple value service.
    angular.module('winterflood.services', [])
        .value('version', '0.1');

})();
