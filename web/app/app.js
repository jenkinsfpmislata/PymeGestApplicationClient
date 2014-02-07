angular.module('PymeGestApp', [
    'ngRoute',
    'ngResource',
    'UsersModule'
]).
        config(['$routeProvider',
    function($routeProvider) {
        
        $routeProvider.
                
                when('/users', {
            templateUrl: 'app/modules/UsersModule/resources/views/Users.html',
            controller: 'UsersDefaultController'
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