(function() {

    'use strict';

    var Dashboard = function() {

        var vm = this;

        vm.message = 'Welcome to the Dashboard';
    };


    angular
        .module('app.controllers')
        .controller('Dashboard', Dashboard);

})();
