// script.js

// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ["ngRoute", "firebase", "ui.materialize"]);

scotchApp.config(function ($routeProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'CategoryController'
        })

        // route for the about page
        .when('/about', {
            templateUrl: 'pages/about.html'
        })

        //route for the product page
        .when('/detail', {
            templateUrl: 'pages/product.html',
            controller: 'ProductController'
        })

        // route for the contact page
        .when('/product', {
            templateUrl: 'pages/mens.html',
            controller: 'ListController'
        });

});

scotchApp.factory('dataShare', function ($rootScope) {
    var savedData = {}
    function set(data) {
        savedData = data;
    }
    function get() {
        return savedData;
    }

    return {
        set: set,
        get: get
    }

});

scotchApp.controller('CategoryController', ['$scope', 'dataShare', function CategoryController($scope, dataShare) {
    var vm = this;
    window.sc = vm;

    vm.applyData = function applyData(params) {
        dataShare.set(params);
    }

}]);

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

scotchApp.controller('ProductController', ['$scope', '$firebaseArray', 'dataShare', function ProductController($scope, $firebaseArray, dataShare) {
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
            if (parseInt(params) == vm.selectSize.choices[i])
                vm.syncQuantity(i);
        }
    }
}]);

scotchApp.controller('LoginController', ['$scope', '$firebaseArray', '$route', function LoginController($scope, $firebaseArray, $route) {
    var vm = this;
    window.ac = vm;
    vm.create = true;
    vm.displayName = "My Account";

    vm.bool = true;

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            vm.user = user;
            if (vm.user.displayName != null)
                vm.displayName = vm.user.displayName;
            else
                vm.displayName = "User";

            vm.isLogin = true;
            vm.create = true;
        } else {
            // No user is signed in.
            vm.user = null;
            vm.displayName = "My Account";
            vm.isLogin = false;
        }
        $scope.$evalAsync();
    });

    vm.setFalse = function () {
        if (vm.create == true)
            vm.create = false;
        vm.username = "";
        vm.password = "";
    }
    
    vm.setTrue = function () {
        if (vm.create == false)
            vm.create = true;
        vm.username = "";
        vm.password = "";
    }

    vm.signUp = function () {
        if (vm.username == "" || vm.password == "") {
            Materialize.toast("SignUp Failed!!! Username or Password mustn't be empty!!!", 3000, 'rounded');
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(vm.username, vm.password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            Materialize.toast("Errors!!! Username was exists!!!", 3000, 'rounded');
            // ...
            vm.bool = false;
        }).then(function () {
            if (vm.bool == false) {
                vm.bool = true;
                return;
            }

            vm.loginSuccess();
        });;
    }
}

    vm.login = function login() {
        if (vm.username == undefined || vm.password == undefined) {
            Materialize.toast("Login Failed!!! Username or Password mustn't be empty!!!", 3000, 'rounded');
        }
        else {
            firebase.auth().signInWithEmailAndPassword(vm.username, vm.password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                Materialize.toast("Login Failed!!! Wrong username or password", 3000, 'rounded');
                vm.bool = false;
            }).then(function () {
                if (vm.bool == false) {
                    vm.bool = true;
                    return;
                }

                vm.loginSuccess();
            });
            //vm.authState();
        }
        //$route.reload();
        //$scope.$evalAsync();
    }

    vm.loginSuccess = function () {
        Materialize.toast("Login Successfully!!!", 3000, 'rounded');
    }

    vm.loginWithFacebook = function loginWithFacebook() {
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('user_birthday');
        provider.addScope('public_profile');

        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            
            vm.loginSuccess();
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            Materialize.toast("Login Failed!!! Authentication has fallen", 3000, 'rounded');
        });
    }

    vm.loginWithGoogle = function loginWithGoogle() {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');

        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            vm.loginSuccess();
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            Materialize.toast("Login Failed!!! Authentication has fallen", 3000, 'rounded');
        });
    }

    vm.logout = function logout() {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            Materialize.toast("Logout Successfully!!!", 3000, 'rounded');
            // vm.displayName = "My Account";
            // vm.isLogin = false;
            $scope.$evalAsync();
            vm.bool = true;
        }, function (error) {
            // An error happened.
        });
    }
}]);