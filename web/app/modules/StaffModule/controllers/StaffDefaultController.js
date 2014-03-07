/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('StaffModule').controller('StaffDefaultController', [
    '$scope',
    'Restangular',
    function($scope, Restangular) {

        /*
         * VARIABLES GLOBALES
         */

        baseStaff = Restangular.all('Empleado');

        $scope.oneEmployed = {};
        
        $scope.oneEmployedEdit = {};

        /*
         * LEER TODOS LOS EMPLEADOS
         */

        $scope.readAllStaff = function() {

            $scope.selection = "table";

            baseStaff.getList().then(function(staff) {
                $scope.allStaff = staff;
            });

        };

        $scope.showTable = function() {

            $scope.selection = "table";
            $scope.oneEmployed = {};

        };
        $scope.showForm = function() {

            $scope.selection = "form";

        };

        $scope.resultsPerPage = [{name: "2", value: 2}, {name: "5", value: 5}, {name: "10", value: 10}];
        $scope.pageSize = $scope.resultsPerPage[0];
        $scope.currentPage = 0;


        $scope.numberOfPages = function() {

            return Math.ceil($scope.allStaff.length / $scope.pageSize);
        };

        $scope.checkAll = function() {

            $scope.allStaff.forEach(function(employed) {

                employed.checked = allCheckboxes.checked;
            });
        };

        $scope.findCheckeds = function() {

            var idsStaff = [];

            $scope.allStaff.forEach(function(employed) {

                if (employed.checked === true) {

                    idsStaff.push(employed.id_empleado);
                }
            });
            return idsStaff;
        };

        /*
         * LEER UN EMPLEADO
         */

        $scope.readEmployed = function(id_employed) {

            var baseEmployed = Restangular.one('Empleado', id_employed);

            baseEmployed.getList().then(function(employed) {
                $scope.Employed = employed;
            });
        };

        /*
         * BORRAR EMPLEADOS
         */

        $scope.deleteEmployed = function(id_employed) {

            Restangular.one('Empleado', id_employed).remove();

            $scope.allStaff.forEach(function(employed) {

                if (employed.id_empleado === id_employed) {

                    $scope.allStaff.splice($scope.allStaff.indexOf(employed), 1);
                }
            });

        };

        $scope.deleteStaff = function(ids_staff) {

            Restangular.one('Empleado', ids_staff.toString()).remove();

            ids_staff.forEach(function(id_employed) {

                $scope.allStaff.forEach(function(employed) {

                    if (employed.id_empleado === id_employed) {

                        $scope.allStaff.splice($scope.allStaff.indexOf(employed), 1);
                    }
                });

            });
        };

        /*
         * INSERTA UN EMPLEADO
         */

        $scope.insertEmployed = function() {

            var baseStaff = Restangular.all('Empleado');

            baseStaff.post($scope.oneEmployed);

            $scope.oneEmployed = {};

            $scope.readAllStaff();
        };


        /*
         * EDITAR UN EMPLEADO
         */

        $scope.editEmployed = function(id_employed) {
            
            $scope.selection = "edition";
            
            var employed = Restangular.one('Familia', id_employed).get();
            
            employed = $scope.oneEmployedEdit;
            
            employed.put();
            
            $scope.readAllStaff();
            
        };
    }
]);