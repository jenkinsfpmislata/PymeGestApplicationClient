angular.module('PymeGestApp', [
    'ngRoute',
    'ngResource',
    'UsersModule',
    'ProductsModule',
    'StaffModule'
]).
        config(['$routeProvider',
    function($routeProvider) {

        $routeProvider.
                when('/users', {
            templateUrl: 'app/modules/UsersModule/resources/views/Users.html',
            controller: 'UsersDefaultController'
        }).
                when('/products', {
            templateUrl: 'app/modules/ProductsModule/resources/views/Products.html',
            controller: 'ProductsDefaultController'
        }).
                when('/employed', {
            templateUrl: 'app/modules/StaffModule/resources/views/Staff.html',
            controller: 'StaffDefaultController'
        }).
                when('/clients', {
            templateUrl: 'app/modules/ClientsModule/resources/views/Clients.html',
            controller: 'ClientsDefaultController'
        }).
                otherwise({
            redirectTo: '/users'
        });
    }]);