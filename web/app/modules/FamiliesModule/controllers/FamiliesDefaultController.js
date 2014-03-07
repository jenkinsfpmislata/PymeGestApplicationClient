/*
 * Project: PymeGestApplicationClient
 * File: FamilyDefaultCOntroller.js
 * Date: 13-feb-2014
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

angular.module('FamiliesModule').controller('FamiliesDefaultController', [
    '$scope',
    'Restangular',
    function($scope, Restangular) {

        /*
         * VARIABLES GLOBALES
         */

        baseFamilies = Restangular.all('Familia');

        $scope.oneFamily = {};
        
        $scope.oneFamilyEdit = {};

        /*
         * LEER TODOS LOS CLIENTES
         */

        $scope.readAllFamilies = function() {

            $scope.selection = "table";

            baseFamilies.getList().then(function(families) {
                $scope.allFamilies = families;
            });
            

        }, error (function() {
            
            alert("Error en la lectura");
        });

        $scope.showTable = function() {

            $scope.selection = "table";
            $scope.oneFamily = {};

        };
        $scope.showForm = function() {

            $scope.selection = "form";

        };

        $scope.resultsPerPage = [{name: "2", value: 2}, {name: "5", value: 5}, {name: "10", value: 10}];
        $scope.pageSize = $scope.resultsPerPage[0];
        $scope.currentPage = 0;


        $scope.numberOfPages = function() {

            return Math.ceil($scope.allFamilies.length / $scope.pageSize);
        };

        $scope.checkAll = function() {

            $scope.allFamilies.forEach(function(family) {

                family.checked = allCheckboxes.checked;
            });
        };

        $scope.findCheckeds = function() {

            var idsFamilies = [];

            $scope.allFamilies.forEach(function(family) {

                if (family.checked === true) {

                    idsFamilies.push(family.id_familia);
                }
            });
            return idsFamilies;
        };

        /*
         * LEER UN CLIENTE
         */

        $scope.readFamily = function(id_familia) {

            var baseFamilies = Restangular.one('Familia', id_familia);

            baseFamilies.getList().then(function(family) {
                $scope.Family = family;
            });
        }, error (function() {
            
            alert("Error en la lectura");
        });

        /*
         * BORRAR CLIENTES
         */

        $scope.deleteFamily = function(id_family) {

            Restangular.one('Familia', id_family).remove();

            $scope.allFamilies.forEach(function(family) {

                if (family.id_familia === id_family) {

                    $scope.allFamilies.splice($scope.allFamilies.indexOf(family), 1);
                }
            });

        }, error (function() {
            
            alert("Error en borrado");
        });

        $scope.deleteFamilies = function(ids_families) {

            Restangular.one('Familia', ids_families.toString()).remove();

            ids_families.forEach(function(id_family) {

                $scope.allFamilies.forEach(function(family) {

                    if (family.id_familia === id_family) {

                        $scope.allFamilies.splice($scope.allFamilies.indexOf(family), 1);
                    }
                });

            });
        }, error (function() {
            
            alert("Error en borrado");
        });

        /*
         * INSERTA UN CLIENTE
         */

        $scope.insertFamily = function() {

            var baseFamilies = Restangular.all('Familia');

            baseFamilies.post($scope.oneFamily);

            $scope.oneFamily = {};

            $scope.readAllFamilies();
        }, error (function() {
            
            alert("Error al insertar");
        });


        /*
         * EDITAR UN CLIENTE
         */

        $scope.editFamily = function(id_familia) {
            
            $scope.selection = "edition";
            
            var family = Restangular.one('Familia', id_familia).get();
            
            family = $scope.oneFamilyEdit;
            
            family.put();
            
            $scope.readAllFamilies();
            
        }, error (function() {
            
            alert("Error al editar");
        });
    }
]);