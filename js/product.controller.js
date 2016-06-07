(function () {
    'use strict';

    angular
        .module('app.product', ['ui.materialize', 'firebase'])
        .controller('ProductController', ProductController);

    ProductController.$inject = ['$scope', '$firebaseArray'];
    function ProductController($scope, $firebaseArray) {
        var vm = this;
        window.sc = vm;
        vm.product = [];
        vm.title = "";
        vm.number = 0;
        vm.focusIndex = 0;
        
        vm.selectSize = {
            value: "0",
            choices: [],
            temp: []
        };

        vm.selectQtt = {
            value: "0",
            quantity: []
        };

        var ref = firebase.database().ref().child("Items");
        vm.product = $firebaseArray(ref.child("Sneakers"));
        vm.product.$loaded(function () {
            vm.setData(vm.product[0]);
        });
        
        vm.setData = function setData(params) {
            var i = 0;

            for (i; i < params.Size.length; i++) {
                if (params.Size[i].Qtt == 0)
                    continue;
                vm.selectSize.choices.push(params.Size[i].Size);
                vm.selectSize.temp.push(params.Size[i].Qtt);
            }
            vm.selectSize.value = vm.selectSize.choices[0];
            vm.syncQuantity(0);
        }

        vm.applyChange = function applyChange(params) {
            vm.number = parseInt(params);
        }

        vm.syncQuantity = function syncQuantity(params) {
            var i = 0;

            while (vm.selectQtt.quantity.length) { 
                vm.selectQtt.quantity.pop();
            }

            for (i; i < vm.selectSize.temp[params]; i++) {
                vm.selectQtt.quantity.push(i + 1);
            }

            vm.selectQtt.value = vm.selectQtt.quantity[0];
        }

        vm.findQtt = function findQtt(params) {
            var i = 0;
            for (i; i < vm.selectSize.choices.length; i++) {
                if (parseInt(params) == vm.selectSize.choices[i])
                    vm.syncQuantity(i);
            }
        }
    }
})();