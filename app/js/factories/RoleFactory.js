(function() {

    'use strict';


    var RoleFactory = function() {

        var roles = {
            public: 1,
            user: 2,
            admin: 4,
        };

        var accessLevels = {
            public: roles.anon |
                roles.user |
                roles.admin,
            anon: roles.public,
            user: roles.user |
                roles.admin,
            admin: roles.admin
        };

        return {
            roles: roles,
            accessLevels: accessLevels
        };
    };

    angular.module('app.factories')
        .factory('RoleFactory', RoleFactory);

})();
