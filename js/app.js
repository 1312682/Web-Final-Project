(function () {
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
            }).otherwise({ redirectTo: '/' });
    });
})();