(function () {
    'use strict';

    angular
        .module('app.list', ['ui.materialize', 'firebase'])
        .controller('ListController', ListController);

    ListController.$inject = ['$scope', '$firebaseArray'];
    function ListController($scope, $firebaseArray) {
        var vm = this;
        window.sc = vm;
        vm.category = "Men";
        vm.listItem = [];
        vm.loaded = false;

        var ref = firebase.database().ref().child("Items");
        vm.product = $firebaseArray(ref.child("Sneakers"));

        vm.changeFilter = function changeFilter(params) {
            vm.category = params;
            while (vm.listItem.length) {
                vm.loaded = true;
                vm.listItem.pop();
            }

            for (var i = 0; i < vm.product.length; i++) {
                if (vm.product[i].Name == params || vm.product[i].Color == params || vm.product[i].Gender == params || vm.product[i].Brand == params)
                    vm.listItem.push(vm.product[i]);
            }
            
            vm.loaded = false;
        }
    }
})();