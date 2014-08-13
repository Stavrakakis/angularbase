(function() {

    'use strict';

    var RoleProvider = function() {

        var roles = {
            public: 1,
            user: 2,
            admin: 4,
        };

        var accessLevels = {
            public: roles.public |
                roles.user |
                roles.admin,
            anon: roles.public,
            user: roles.user |
                roles.admin,
            admin: roles.admin
        };

        this.$get = function() {
            return {
                roles: roles,
                accessLevels: accessLevels
            };
        };
    };

    angular.module('app.providers', []);

    angular.module('app.providers')
        .provider('role', RoleProvider);

})();
