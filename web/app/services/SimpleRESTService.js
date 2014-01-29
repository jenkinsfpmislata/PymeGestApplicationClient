angular.module('PymeGestApp').factory('SimpleRESTService', [
    '$resource',
    function($resource) {

        return $resource('http://localhost:8084/PymegestApplicationServer/api/Usuario/:id_usuario', 
        {id_usuario:'@id'});
        
    }]);