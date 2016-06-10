(function () {
    var scotchApp = angular.module('scotchApp');

    scotchApp.controller('ProductController', ['$scope', '$firebaseArray', 'dataShare', 'userShare', function ProductController($scope, $firebaseArray, dataShare, userShare) {
        var vm = this;
        window.sc = vm;
        vm.product = [];

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

        var ref = firebase.database().ref().child("Carts");
        vm.list = $firebaseArray(ref);

        vm.list.$loaded(function () {
            vm.item = dataShare.get();

            $scope.ID = vm.item.ID;
            console.log($scope.ID);
            vm.setData(vm.item)
        }).then(function () {
            var item = vm.item.Brand;
            dataShare.set(item.toString());
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
                if (parseInt(params) == vm.selectSize.choices[i]) {
                    vm.syncQuantity(i);
                    vm.setSize();
                    vm.setQtt();
                }

            }
        }

        vm.setSize = function setSize() {
            $scope.Size = vm.selectSize.value;
            console.log($scope.Size);
        }

        vm.setQtt = function setQtt() {
            $scope.Qtt = vm.selectQtt.value;
            console.log($scope.Qtt);
        }

        $scope.listItem = [];

        vm.addToCart = function addToCart() {
            $scope.Item = {
                ID: $scope.ID,
                Qtt: $scope.Qtt,
                Size: $scope.Size
            }

            $scope.Uid = userShare.get();
            console.log($scope.Uid);

            if ($scope.Uid == null || $scope.Uid == undefined || $scope.Uid == {}) {
                Materialize.toast("Please login to add to cart!!!", 5000, 'rounded');
                return;
            }

            $scope.addList = $firebaseArray(ref);

            $scope.addList.$loaded(function () {

                for (var i = 0; i < $scope.addList.length; i++) {
                    if ($scope.Uid == $scope.addList[i].Uid) {
                        // $scope.main = $firebaseArray($scope.addList[i].Items);
                        // $scope.main.$add($scope.Item);
                        Materialize.toast("Added to Cart!!!", 5000, 'rounded');
                    }
                }
            });
        }
    }]);
})();