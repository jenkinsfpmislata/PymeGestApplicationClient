angular.module('PymeGestApp', [
    'ngRoute',
    'ngResource',
    'UsersModule',
    'ClientsModule',
    'StaffModule'    
]).
        config(['$routeProvider',
    function($routeProvider) {
        
        $routeProvider.
                
                when('/users', {
            templateUrl: 'app/modules/UsersModule/resources/views/Users.html',
            controller: 'UsersDefaultController'
        }).
                
                when('/clients', {
            templateUrl: 'app/modules/ClientsModule/resources/views/Clients.html',
            controller: 'ClientsDefaultController'
        }).
                
                when('/staff', {
            templateUrl: 'app/modules/StaffModule/resources/views/Staff.html',
            controller: 'ProductDefaultController'
        }).
                otherwise({
            redirectTo: '/users'
        });
    }]);

