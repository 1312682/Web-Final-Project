// script.js

    // create the module and name it scotchApp
    var scotchApp = angular.module('scotchApp', ["ngRoute","firebase"]);
    
    scotchApp.config(function($routeProvider) {
        $routeProvider
            // route for the home page
            .when('/', {
                templateUrl : 'home.html'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'pages/about.html'
            })

            // route for the contact page
            .when('/mens', {
                templateUrl : 'pages/mens.html',
                controller:'ListController'
            });
    });
    
    scotchApp.controller('ListController', ['$scope','$firebaseArray', function ListController($scope, $firebaseArray){
        var vm = this;
        window.sc = vm;
        window.sc1 = 8;
        vm.category = "Men";
        vm.listItem = [];
        vm.loaded = false;

        var ref = firebase.database().ref().child("Items");
        vm.product = $firebaseArray(ref.child("Sneakers"));

        vm.changeFilter = function changeFilter(params) {
            vm.category = params;
            while (vm.listItem.length) {
                vm.loaded = true;
                vm.listItem.pop();
            }

            for (var i = 0; i < vm.product.length; i++) {
                if (vm.product[i].Name == params || vm.product[i].Color == params || vm.product[i].Gender == params || vm.product[i].Brand == params)
                    vm.listItem.push(vm.product[i]);
            }
            
            vm.loaded = false;
        }
    }]);