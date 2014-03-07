/*
 * Project: PymeGestApplicationClient
 * File: UsersDefaultController.js
 * Date: 11-feb-2014
 * Encoding: UTF-8
 * License: default
 *
 * Copyright(c) PymeGest 2014
 * www.pymegest.com
 * admin@pymegest.com
 *
 * This file is part of Pymegest.
 * Pymegest is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * Pymegest is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Pymegest. If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * @author PymeGestSoft
 * @version 1.0
 * @since 1.0
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
        
        $scope.oneUserEdit = {};

        /*
         * LEER TODOS LOS EMPLEADOS
         */

        $scope.readAllStaff = function() {

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
        }, error (function() {
            
            alert("Error en la lectura");
        });

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

        }, error (function() {
            
            alert("Error en borrado");
        });

        $scope.deleteUsers = function(ids_users) {

            Restangular.one('Usuario', ids_users.toString()).remove();

            ids_users.forEach(function(id_user) {

                $scope.allUsers.forEach(function(user) {

                    if (user.id_usuario === id_user) {

                        $scope.allUsers.splice($scope.allUsers.indexOf(user), 1);
                    }
                });

            });
        }, error (function() {
            
            alert("Error en borrado");
        });

        /*
         * INSERTA UN USUARIO
         */

        $scope.insertUser = function() {

            var baseUsers = Restangular.all('Usuario');

            baseUsers.post($scope.oneUser);

            $scope.oneUser = {};

            $scope.readAllUsers();
        }, error (function() {
            
            alert("Error insertando");
        });


        /*
         * EDITAR UN USUARIO
         */

        $scope.editUser = function(id_user) {

            $scope.selection = "edition";
            
            var user = Restangular.one('Familia', id_user).get();
            
            user = $scope.oneUserEdit;
            
            user.put();
            
            $scope.readAllUsers();
        }, error (function() {
            
            alert("Error editando");
        });
    }
]);