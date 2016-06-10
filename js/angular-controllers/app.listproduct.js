(function () {
    var scotchApp = angular.module('scotchApp');

    scotchApp.controller('ListController', ['$scope', '$firebaseArray', 'dataShare', '$route', function ListController($scope, $firebaseArray, dataShare, $route) {
        var vm = this;
        window.sc = vm;
        vm.filter = [];
        vm.listItem = [];
        vm.category = '';
        vm.displayName = "My Account";

        var ref = firebase.database().ref().child("Items");
        var cart = firebase.database().ref().child("Carts");
        vm.listID = $firebaseArray(cart);
        vm.product = $firebaseArray(ref.child("Sneakers"));

        vm.product.$loaded(function () {
            vm.filterIndex = dataShare.get();
            vm.updateFilter(vm.filterIndex);
        })

        vm.updateFilter = function updateFilter(params) {
            var param = params.toString();
            vm.category = param;
            while (vm.listItem.length) {
                vm.listItem.pop();
            }

            for (var i = 0; i < vm.product.length; i++) {
                if (param.indexOf(vm.product[i].Name) != -1 || param.indexOf(vm.product[i].Color) != -1 || param.indexOf(vm.product[i].Gender) != -1 || param.indexOf(vm.product[i].Brand) != -1 ||
                    param.indexOf(vm.product[i].Type) != -1 ||
                    vm.product[i].Name.indexOf(param) != -1 || vm.product[i].Color.indexOf(param) != -1 || vm.product[i].Gender.indexOf(param) != -1 || vm.product[i].Brand.indexOf(param) != -1 || vm.product[i].Type.indexOf(param) != -1)
                    vm.listItem.push(vm.product[i]);
            }
        }

        vm.applyData = function applyData(params) {
            vm.detail = vm.listItem[parseInt(params)];
            dataShare.set(vm.detail);
        }
    }]);
})();