/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('UsersModule', [
    'restangular'
])
.config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://localhost:8084/PymegestApplicationServer/api/');
});