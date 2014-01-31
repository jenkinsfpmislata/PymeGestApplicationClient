/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('UsersModule', [
    'restangular'
])
        .config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/PymeGestApplicationServer/api/');
    
    RestangularProvider.addElementTransformer('Usuario', false, function(user) {

        user.disabled = true;
        user.checked = false;
        
        return user;
    });
});