(function() {

    'use strict';

    /* jasmine specs for controllers go here */

    describe('RoleProvider', function() {

        var roleProvider;

        beforeEach(function() {

            module('app.providers');

            inject(function($injector) {

                roleProvider = $injector.get('role');
            });
        });

        it('should return the correct roles', function() {

            var expectedRoles = {
                public: 1,
                user: 2,
                admin: 4
            };

            expect(roleProvider.roles)
                .toEqual(expectedRoles);
        });

        it('should not allow users to access admin levels', function() {

            var outcome = roleProvider.roles.user & roleProvider.accessLevels.admin;

            expect(outcome)
                .toEqual(0);
        });

        it('should allow users to access public levels', function() {

            var outcome = roleProvider.roles.user & roleProvider.accessLevels.public;

            expect(outcome)
                .toEqual(2);
        });

        it('should not allow public to access admin levels', function() {

            var outcome = roleProvider.roles.public & roleProvider.accessLevels.admin;

            expect(outcome)
                .toEqual(0);
        });

        it('should allow admins to access user levels', function() {

            var outcome = roleProvider.roles.admin & roleProvider.accessLevels.user;

            expect(outcome)
                .toEqual(4);
        });

        it('should allow admins to access public levels', function() {

            var outcome = roleProvider.roles.admin & roleProvider.accessLevels.public;

            expect(outcome)
                .toEqual(4);
        });

        it('should allow admins to access admin levels', function() {

            var outcome = roleProvider.roles.admin & roleProvider.accessLevels.admin;

            expect(outcome)
                .toEqual(4);
        });

    });
})();
