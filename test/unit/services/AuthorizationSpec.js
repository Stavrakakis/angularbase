(function() {

    'use strict';

    /* jasmine specs for controllers go here */

    describe('Authorization', function() {

        var authService;
        var roleProvider;

        beforeEach(module('ngCookies', 'app.services', 'app.providers', 'app.settings'));

        beforeEach(function($provide) {

            inject(function($injector) {
                authService = $injector.get('Authorization');
                roleProvider = $injector.get('role');
            });

        });


        it('should allow anonymous users to access public content', function() {

            var authorized = authService.authorize(roleProvider.accessLevels.public, roleProvider.roles.anon);

            expect(authorized)
                .toEqual(true);
        });

        it('should not allow anonymous users to access user content', function() {

            var authorized = authService.authorize(roleProvider.accessLevels.user, roleProvider.roles.anon);

            expect(authorized)
                .toEqual(false);
        });

        it('should not allow anonymous users to access admin content', function() {

            var authorized = authService.authorize(roleProvider.accessLevels.admin, roleProvider.roles.anon);

            expect(authorized)
                .toEqual(false);
        });


        it('should allow regular users to access public functionality', function() {

            var authorized = authService.authorize(roleProvider.accessLevels.public, roleProvider.roles.user);

            expect(authorized)
                .toEqual(true);
        });

        it('should allow regular users to access user functionality', function() {

            var authorized = authService.authorize(roleProvider.accessLevels.user, roleProvider.roles.user);

            expect(authorized)
                .toEqual(true);
        });

        it('should not allow regular users to access admin functionality', function() {

            var authorized = authService.authorize(roleProvider.accessLevels.admin, roleProvider.roles.user);

            expect(authorized)
                .toEqual(false);
        });

        it('should allow admin users to access public functionality', function() {

            var authorized = authService.authorize(roleProvider.accessLevels.public, roleProvider.roles.admin);

            expect(authorized)
                .toEqual(true);
        });

        it('should allow admin users to access user functionality', function() {

            var authorized = authService.authorize(roleProvider.accessLevels.user, roleProvider.roles.admin);

            expect(authorized)
                .toEqual(true);
        });

        it('should allow admin users to access admin functionality', function() {

            var authorized = authService.authorize(roleProvider.accessLevels.public, roleProvider.roles.admin);

            expect(authorized)
                .toEqual(true);
        });

    });
})();
