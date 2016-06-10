(function () {
    var app = angular.module('scotchApp');
    app.service('GoogleAnalytics', function ($window) {
        var service = {};
        service.init = init;
        service.send = send;
        return service;

        function init() {
            $window.ga('create', 'UA-79042504-1', 'auto');
        };

        function send(packet) {
            $window.ga('send', packet);
        };
    });
})();