/*
 * Project: PymeGestApplicationClient
 * File: ClientsDefaultController.js
 * Date: 06-feb-2014
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

angular.module('ClientsModule').controller('ClientsDefaultController', [
    '$scope',
    'Restangular',
    function($scope, Restangular) {

        /*
         * VARIABLES GLOBALES
         */

        baseClients = Restangular.all('Clientes');

        $scope.oneClient = {};

        /*
         * LEER TODOS LOS CLIENTES
         */

        $scope.readAllClients = function() {

            $scope.selection = "table";

            baseClients.getList().then(function(clients) {
                $scope.allClients = clients;
            });

        };

        $scope.showTable = function() {

            $scope.selection = "table";
            $scope.oneClient = {};

        };
        $scope.showForm = function() {

            $scope.selection = "form";

        };

        $scope.resultsPerPage = [{name: "2", value: 2}, {name: "5", value: 5}, {name: "10", value: 10}];
        $scope.pageSize = $scope.resultsPerPage[0];
        $scope.currentPage = 0;


        $scope.numberOfPages = function() {

            return Math.ceil($scope.allClients.length / $scope.pageSize);
        };

        $scope.checkAll = function() {

            $scope.allClients.forEach(function(client) {

                client.checked = allCheckboxes.checked;
            });
        };

        $scope.findCheckeds = function() {

            var idsClients = [];

            $scope.allClients.forEach(function(client) {

                if (client.checked === true) {

                    idsClients.push(client.id_cliente);
                }
            });
            return idsClients;
        };

        /*
         * LEER UN CLIENTE
         */

        $scope.readClient = function(id_client) {

            var baseClient = Restangular.one('Empleado', id_client);

            baseClient.getList().then(function(client) {
                $scope.Client = client;
            });
        };

        /*
         * BORRAR CLIENTES
         */

        $scope.deleteClient = function(id_client) {

            Restangular.one('Cliente', id_client).remove();

            $scope.allClients.forEach(function(client) {

                if (client.id_cliente === id_cliente) {

                    $scope.allClients.splice($scope.allClients.indexOf(client), 1);
                }
            });

        };

        $scope.deleteClients = function(ids_clients) {

            Restangular.one('Empleado', ids_clients.toString()).remove();

            ids_clients.forEach(function(id_client) {

                $scope.allClients.forEach(function(client) {

                    if (client.id_client === id_client) {

                        $scope.allClients.splice($scope.allClients.indexOf(client), 1);
                    }
                });

            });
        };

        /*
         * INSERTA UN CLIENTE
         */

        $scope.insertClient = function() {

            var baseClients = Restangular.all('Cliente');

            baseClients.post($scope.oneClient);

            $scope.oneClient = {};

            $scope.readAllClients();
        };


        /*
         * EDITAR UN CLIENTE
         */

        $scope.editClient = function(id_client) {

            var client = Restangular.one('Cliente', id_client).get();
            alert(client.nombre);
            //user.nombre = 'Sepia';
            //user.put();
            //$scope.selection = "form";
        };
    }
]);