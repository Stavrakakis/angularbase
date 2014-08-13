(function() {

    'use strict';

    /* Services */




    /**
     * AuthService provides login, logout and role authorization functionality
     * @param {object} roleProvider - An injectable roleConfiguration factory
     * @returns {object} - The AuthService singleton
     */
    var Authorization = function(roleProvider, $http, authServer, $cookieStore) {

        var service = this;
        var defaultUser = {
            username: '',
            role: roleProvider.roles.public
        };

        var currentUser = $cookieStore.get('user') || defaultUser;

        // Public members

        service.accessLevels = roleProvider.accessLevels;
        service.roles = roleProvider.roles;


        /**
         * Authorizes a particular accessLevel against a provided user role.  Returns a boolean value representing
         * whether the provided role has access to particular functionality.
         * @param {object} accessLevel - An access level defined by RoleConfiguration.accessLevels
         * @param {object} role - A role defined in RoleConfiguration.roles
         * @returns {boolean} - Whether the provided role has access to the specified level of functionality
         */
        service.authorize = function(accessLevel, role) {

            if (role === undefined) {
                role = currentUser.role.bitMask || currentUser.role;
            }
            // perform bitwise AND to check if the provided role can access the given access level
            return (accessLevel & role) > 0;
        };


        /**
         * Logs in the provided user, calling the appropriate success or failure callback when complete
         * @param {object} user - The user to log in
         * @param {function} success - A success callback
         * @param {function} error - A failure callback
         */
        service.login = function(user, success, error) {

            $http({
                url: authServer,
                method: "POST",
                data: user,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
                .success(function(user) {
                    changeUser(user);
                    success(user);
                })
                .error(error);
        };


        /**
         * Returns a boolean value representing if the current user is logged in
         * @param {object} user - The user to check, defaults to Authorization.currentUser if not specified
         * @returns {boolean} - Is the user logged in
         */
        service.isLoggedIn = function(user) {

            if (user === undefined) {
                user = currentUser;
            }

            var userRole = user.role.bitMask || user.role;

            var loggedIn = userRole === service.roles.user || userRole === service.roles.admin;

            return loggedIn;
        };

        // Private methods

        var changeUser = function changeUser(user) {
            angular.extend(currentUser, user);
        };

        return service;
    };


    angular.module('app.services')
        .service('Authorization', ['role', '$http', 'authServer', '$cookieStore', Authorization]);

})();
