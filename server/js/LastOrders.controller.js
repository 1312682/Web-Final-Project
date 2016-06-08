myapp.controller('LastOrdersCtrl', ['$scope', '$firebaseObject','$firebaseArray', function($scope, $firebaseObject, $firebaseArray){
    var vm = this;
    var ref = firebase.database().ref().child("Orders");
    vm.orders = $firebaseArray(ref);
    
    vm.orders.$loaded().then(function(){

    });
}]);