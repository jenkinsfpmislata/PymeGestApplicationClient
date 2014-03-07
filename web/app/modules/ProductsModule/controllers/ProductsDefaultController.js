/*
 * Project: PymeGestApplicationClient
 * File: ProductsDefaultController.js
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

angular.module('ProductsModule').controller('ProductsDefaultController', [
    '$scope',
    'Restangular',
    function($scope, Restangular) {

        /*
         * VARIABLES GLOBALES
         */

        baseProducts = Restangular.all('Producto');

        $scope.oneProduct = {};
        
        $scope.oneProductEdit = {};

        /*
         * LEER TODOS LOS USUARIOS
         */

        $scope.readAllProducts = function() {

            $scope.selection = "table";

            baseProducts.getList().then(function(products) {
                $scope.allProducts = products;
            });

        }, error (function() {
            
            alert("Error en la lectura");
        });

        $scope.showTable = function() {

            $scope.selection = "table";
            $scope.oneProduct = {};

        };
        $scope.showForm = function() {

            $scope.selection = "form";

        };

        $scope.resultsPerPage = [{name: "2", value: 2}, {name: "5", value: 5}, {name: "10", value: 10}];
        $scope.pageSize = $scope.resultsPerPage[0];
        $scope.currentPage = 0;


        $scope.numberOfPages = function() {

            return Math.ceil($scope.allProducts.length / $scope.pageSize);
        };

        $scope.checkAll = function() {

            $scope.allProducts.forEach(function(product) {

                product.checked = allCheckboxes.checked;
            });
        };

        $scope.findCheckeds = function() {

            var idsProductos = [];

            $scope.allProducts.forEach(function(product) {

                if (product.checked === true) {

                    idsProductos.push(product.id_producto);
                }
            });
            return idsProductos;
        };

        /*
         * LEER UN PRODUCTO
         */

        $scope.readProduct = function(id_product) {

            var baseProduct = Restangular.one('Producto', id_product);

            baseProduct.getList().then(function(product) {
                $scope.Product = product;
            });
        }, error (function() {
            
            alert("Error en la lectura");
        });

        /*
         * BORRAR PRODUCTO
         */

        $scope.deleteProduct = function(id_product) {

            Restangular.one('Producto', id_product).remove();

            $scope.allProducts.forEach(function(product) {

                if (product.id_producto === id_product) {

                    $scope.allProducts.splice($scope.allProducts.indexOf(product), 1);
                }
            });

        }, error (function() {
            
            alert("Error en borrado");
        });

        $scope.deleteProducts = function(ids_products) {

            Restangular.one('Producto', ids_products.toString()).remove();

            ids_products.forEach(function(id_product) {

                $scope.allProducts.forEach(function(product) {

                    if (product.id_producto === id_product) {

                        $scope.allProducts.splice($scope.allProducts.indexOf(product), 1);
                    }
                });

            });
        }, error (function() {
            
            alert("Error en borrado");
        });

        /*
         * INSERTA UN PRODUCTO
         */

        $scope.insertProduct = function() {

            var baseProducts = Restangular.all('Producto');

            baseProducts.post($scope.oneProduct);

            $scope.oneProduct = {};

            $scope.readAllProducts();
        }, error (function() {
            
            alert("Error al insertar");
        });


        /*
         * EDITAR UN PRODUCTO
         */

        $scope.editProduct = function(id_product) {
            
            $scope.selection = "edition";
            
            var product = Restangular.one('Familia', id_product).get();
            
            product = $scope.oneProductEdit;
            
            product.put();
            
            $scope.readAllProducts();
        }, error (function() {
            
            alert("Error al editar");
        });
    }
]);