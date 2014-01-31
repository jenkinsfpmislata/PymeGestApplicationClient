/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('UsersModule').controller('UsersDefaultController', [
    '$scope',
    'Restangular',
    function($scope, Restangular) {

        /*
         * VARIABLES GLOBALES
         */

        baseUsers = Restangular.all('Usuario');

        $scope.oneUser = {};

        /*
         * LEER TODOS LOS USUARIOS
         */

        $scope.readAllUsers = function() {

            $scope.selection = "table";

            baseUsers.getList().then(function(users) {
                $scope.allUsers = users;
            });

        };

        $scope.showTable = function() {

            $scope.selection = "table";
            $scope.oneUser = {};

        };
        $scope.showForm = function() {

            $scope.selection = "form";

        };

        $scope.resultsPerPage = [{name: "2", value: 2}, {name: "5", value: 5}, {name: "10", value: 10}];
        $scope.pageSize = $scope.resultsPerPage[0];
        $scope.currentPage = 0;


        $scope.numberOfPages = function() {

            return Math.ceil($scope.allUsers.length / $scope.pageSize);
        };

        $scope.checkAll = function() {

            $scope.allUsers.forEach(function(user) {

                user.checked = allCheckboxes.checked;
            });
        };

        $scope.findCheckeds = function() {

            var idsUsuarios = [];

            $scope.allUsers.forEach(function(user) {

                if (user.checked === true) {

                    idsUsuarios.push(user.id_usuario);
                }
            });
            return idsUsuarios;
        };

        /*
         * LEER UN USUARIO
         */

        $scope.readUser = function(id_user) {

            var baseUser = Restangular.one('Usuario', id_user);

            baseUser.getList().then(function(user) {
                $scope.User = user;
            });
        };

        /*
         * BORRAR USUARIOS
         */

        $scope.deleteUser = function(id_user) {

            Restangular.one('Usuario', id_user).remove();

            $scope.allUsers.forEach(function(user) {

                if (user.id_usuario === id_user) {

                    $scope.allUsers.splice($scope.allUsers.indexOf(user), 1);
                }
            });

        };

        $scope.deleteUsers = function(ids_users) {

            Restangular.one('Usuario', ids_users.toString()).remove();

            ids_users.forEach(function(id_user) {

                $scope.allUsers.forEach(function(user) {

                    if (user.id_usuario === id_user) {

                        $scope.allUsers.splice($scope.allUsers.indexOf(user), 1);
                    }
                });

            });
        };

        /*
         * INSERTA UN USUARIO
         */

        $scope.insertUser = function() {

            var baseUsers = Restangular.all('Usuario');

            baseUsers.post($scope.oneUser);

            //$scope.allUsers.push($scope.oneUser);

            $scope.oneUser = {};

            $scope.readAllUsers();
        };


        /*
         * EDITAR UN USUARIO
         */

        $scope.editUser = function(id_user) {

            var user = Restangular.one('Usuario', id_user).get();
            alert(user.nombre);
            //user.nombre = 'Sepia';
            //user.put();
            //$scope.selection = "form";
        };
    }
]);