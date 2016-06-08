
angular.module('SneakersApp', ["firebase"]).controller('SneakersAppCtrl', ['$scope', '$firebaseObject','$firebaseArray', function($scope, $firebaseObject, $firebaseArray){
    var vm = this;
    var ref = firebase.database().ref().child("Items");
    var obj = $firebaseObject(ref);
    vm.add = $firebaseArray(ref.child("Sneakers"));
    obj.$bindTo($scope,'data');
    
    obj.$loaded().then(function(data){
        vm.shoes = $scope.data.Sneakers;
        
        vm.newshoes = {ID:"",Name:"", Brand:"", Color:"", Price: "", Gender: "", Type: "",Img: [{Url:""},{Url:""},{Url:""},{Url:""},{Url:""}],Url:"", Size:[{Size:"36",Qtt:"0"},{Size:"37",Qtt:"0"},{Size:"38",Qtt:"0"},{Size:"39",Qtt:"0"},{Size:"40",Qtt:"0"},{Size:"41",Qtt:"0"},{Size:"42",Qtt:"0"},{Size:"43",Qtt:"0"},{Size:"44",Qtt:"0"}]};
        window.sc = vm.newshoes;
        vm.SelectOptionList = [{Sex:"Men"},{Sex:"Women"}];
        vm.indexChange = function(index){
            if(index.Sex == "Men")
                {
                    vm.newshoes.Gender="Men";
                    var i = 1;
                    var done = false;
                    var tempID;
                    while(done == false)
                        {
                            done = true;
                            tempID = "MS" + i;
                            for(var j = 0; j < vm.add.length; j++)
                                {
                                    if(vm.add[j].ID == tempID)
                                        {
                                            i++;
                                            done = false;
                                        }
                                }
                            
                        }
                     vm.newshoes.ID = tempID;       
                }
            else
                {
                    vm.newshoes.Gender="Women";
                    var i = 1;
                    var done = false;
                    var tempID;
                    while(done == false)
                        {
                            done = true;
                            tempID = "WS" + i;
                            for(var j = 0; j < vm.add.length; j++)
                                {
                                    if(vm.add[j].ID == tempID)
                                        {
                                            i++;
                                            done = false;
                                        }
                                }
                            
                        }
                     vm.newshoes.ID = tempID;
                }
        };
        vm.addSneaker = function(){
            vm.add.$add(vm.newshoes);
            vm.btnResetClick();
        }
        vm.btnResetClick = function(){
            vm.newshoes = {ID:"",Name:"", Brand:"", Color:"", Price: "", Gender: "", Type: "",Img: [{Url:""},{Url:""},{Url:""},{Url:""},{Url:""}],Url:"", Size:[{Size:"36",Qtt:"0"},{Size:"37",Qtt:"0"},{Size:"38",Qtt:"0"},{Size:"39",Qtt:"0"},{Size:"40",Qtt:"0"},{Size:"41",Qtt:"0"},{Size:"42",Qtt:"0"},{Size:"43",Qtt:"0"},{Size:"44",Qtt:"0"}]};
            $scope.GD = {};
        }
    });
    
    
}]);