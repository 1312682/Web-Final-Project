(function() {
'use strict';

    angular
        .module('app.product')
        .controller('ProductController', ProductController);

    ProductController.$inject = ['$scope', '$http'];
    function ProductController($scope, $http) {
        var vm = this;
        vm.number = 8;
        
        vm.applyChange = function applyChange(params) {
            vm.number = parseInt(params);
        }
    }
})();