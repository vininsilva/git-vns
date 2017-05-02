var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider

        .when("/list", {

            templateUrl: "list-book.html",
            controller: "ListBookCtrl"

        })

        .when("/create", {

            templateUrl: "create-book.html",
            controller: "CreateBookCtrl"

        })

        .when("/create/:bookId", {
            templateUrl: "create-book.html",
            controller: "CreateBookCtrl"
        })
        .otherwise({

            redirectTo: "/list"

        });

});