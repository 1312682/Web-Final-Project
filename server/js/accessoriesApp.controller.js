angular.module('AccessoriesApp', ["firebase"]).controller('AccessoriesAppCtrl', ['$scope', '$firebaseObject', function($scope, $firebaseObject){
    var vm = this;
    var ref = firebase.database().ref().child("Items");
    var obj = $firebaseObject(ref);
    obj.$bindTo($scope,'data');
    
    obj.$loaded().then(function(data){
        vm.acs = $scope.data.Accessories;
    });
    
}]);