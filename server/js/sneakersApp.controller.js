
angular.module('SneakersApp', ["firebase"]).controller('SneakersAppCtrl', ['$scope', '$firebaseObject', function($scope, $firebaseObject){
    var vm = this;
    vm.men = {};
    var ref = firebase.database().ref().child("Items");
    var obj = $firebaseObject(ref);
    vm.all = {};
    obj.$bindTo($scope,'data');
    
    obj.$loaded().then(function(data){
        vm.shoes = $scope.data.Sneakers;
    });
    
    
}]);