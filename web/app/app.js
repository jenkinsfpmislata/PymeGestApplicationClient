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
                otherwise({
            redirectTo: '/users'
        });
    }]);

