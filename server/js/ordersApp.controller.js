angular.module('OrdersApp', ["firebase"]).controller('OrdersAppCtrl', ['$scope', '$firebaseObject', function($scope, $firebaseObject){
    var vm = this;
    window.sc = vm;
    var ref = firebase.database().ref();
    var obj = $firebaseObject(ref);
    obj.$bindTo($scope,'data');
    
    obj.$loaded().then(function(data){
        vm.orders = $scope.data.Orders;
        
        vm.Show = false;
        vm.showForm = function(index)
        {
            vm.Show = true;
            vm.product = vm.orders[index];
            return true;
        }
    });
    
    
}]);