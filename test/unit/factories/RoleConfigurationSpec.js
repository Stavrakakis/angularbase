(function() {

    'use strict';

    /* jasmine specs for controllers go here */

    describe('UserRole Configuration', function() {

        var roleFactory;

        beforeEach(function() {

            module('app.factories');

            inject(function($injector) {
                roleFactory = $injector.get('RoleConfiguration');
            });
        });

        it('should return the correct roles', function() {

            var expectedRoles = {
                anon: 1,
                user: 2,
                admin: 4
            };

            expect(roleFactory.roles)
                .toEqual(expectedRoles);
        });

        it('should not allow users to access admin levels', function() {

            var outcome = roleFactory.roles.user & roleFactory.accessLevels.admin;

            expect(outcome)
                .toEqual(0);
        });

        it('should allow users to access public levels', function() {

            var outcome = roleFactory.roles.user & roleFactory.accessLevels.public;

            expect(outcome)
                .toEqual(2);
        });

        it('should not allow public to access admin levels', function() {

            var outcome = roleFactory.roles.public & roleFactory.accessLevels.admin;

            expect(outcome)
                .toEqual(0);
        });

        it('should allow admins to access user levels', function() {

            var outcome = roleFactory.roles.admin & roleFactory.accessLevels.user;

            expect(outcome)
                .toEqual(4);
        });

        it('should allow admins to access public levels', function() {

            var outcome = roleFactory.roles.admin & roleFactory.accessLevels.public;

            expect(outcome)
                .toEqual(4);
        });

        it('should allow admins to access admin levels', function() {

            var outcome = roleFactory.roles.admin & roleFactory.accessLevels.admin;

            expect(outcome)
                .toEqual(4);
        });

    });
})();
