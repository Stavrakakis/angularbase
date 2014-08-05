(function() {

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
