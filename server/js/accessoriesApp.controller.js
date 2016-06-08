angular.module('AccessoriesApp', ["firebase"]).controller('AccessoriesAppCtrl', ['$scope', '$firebaseObject','$firebaseArray', function($scope, $firebaseObject, $firebaseArray){
    var vm = this;
    var ref = firebase.database().ref().child("Items");
    var obj = $firebaseObject(ref);
    obj.$bindTo($scope,'data');
    vm.add = $firebaseArray(ref.child("Accessories"));
    
    obj.$loaded().then(function(data){
        vm.acs = $scope.data.Accessories;
        /*New accessories*/
        vm.newacs = {ID:"",Name:"", Brand:"", Color:"", Price: "", Qtt:"",Img: [{Url:""},{Url:""},{Url:""},{Url:""},{Url:""}],Url:""};
        
        vm.GenerateID = function(){
            /*Generate new ID*/
            var i = 1;
            var done = false;
            var tempID;
            while(done == false)
                {
                    done = true;
                    tempID = "A" + i;
                    for(var j = 0; j < vm.add.length; j++)
                        {
                            if(vm.add[j].ID == tempID)
                                {
                                    i++;
                                    done = false;
                                }
                        }

                }
             vm.newacs.ID = tempID;
        }
        vm.GenerateID();
        
        window.sc = vm.newacs;
        vm.addAcs = function(){
            vm.add.$add(vm.newacs);
            vm.btnResetClick();
        }
        vm.btnResetClick = function(){
            vm.newacs = {ID:"",Name:"", Brand:"", Color:"", Price: "", Qtt:"",Img: [{Url:""},{Url:""},{Url:""},{Url:""},{Url:""}],Url:""};
            vm.GenerateID();
        }
         vm.btnResetClick();
    });
    
}]);