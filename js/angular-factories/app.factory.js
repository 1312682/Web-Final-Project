(function () {
    var scotchApp = angular.module('scotchApp');

    scotchApp.factory('dataShare', function ($rootScope) {
        var savedData = {}
        function set(data) {
            savedData = data;
        }
        function get() {
            return savedData;
        }

        return {
            set: set,
            get: get
        }
    });

    scotchApp.factory('userShare', function ($rootScope) {
        var savedData = {}
        function set(data) {
            savedData = data;
        }
        function get() {
            return savedData;
        }

        return {
            set: set,
            get: get
        }
    });
})();