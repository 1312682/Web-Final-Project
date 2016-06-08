myapp.controller('LastAddedSneakersCtrl', ['$scope', '$firebaseObject','$firebaseArray', function($scope, $firebaseObject, $firebaseArray){
    var vm = this;
    var ref = firebase.database().ref().child("Items");
    vm.snk = $firebaseArray(ref.child("Sneakers"));
    
    vm.snk.$loaded().then(function(){
        vm.show = [];
        for(var i = vm.snk.length; i >= 0; i--)
            {
                vm.show.push(vm.snk[i]);
            }
    });
}]);
        