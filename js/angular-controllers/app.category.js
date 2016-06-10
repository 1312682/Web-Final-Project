(function () {
    var scotchApp = angular.module('scotchApp');

    scotchApp.controller('CategoryController', ['$scope', 'dataShare', function CategoryController($scope, dataShare) {
        var vm = this;
        window.sc = vm;

        vm.applyData = function applyData(params) {
            dataShare.set(params);
        }
    }]);
})();