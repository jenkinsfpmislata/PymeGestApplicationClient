/*
 * Project: PymeGestApplicationClient
 * File: WorkPlaceDefaultController.js
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

angular.module('JobsModule').controller('JobsDefaultController', [
    '$scope',
    'Restangular',
    function($scope, Restangular) {

        /*
         * VARIABLES GLOBALES
         */

        baseJobs = Restangular.all('Puesto');

        $scope.oneJob = {};
        
        $scope.oneJobEdit = {};

        /*
         * LEER TODOS LOS USUARIOS
         */

        $scope.readAllJobs = function() {

            $scope.selection = "table";

            baseJobs.getList().then(function(jobs) {
                $scope.allJobs = jobs;
            });

        }, error (function() {
            
            alert("Error en la lectura");
        });

        $scope.showTable = function() {

            $scope.selection = "table";
            $scope.oneJob = {};

        };
        $scope.showForm = function() {

            $scope.selection = "form";

        };

        $scope.resultsPerPage = [{name: "2", value: 2}, {name: "5", value: 5}, {name: "10", value: 10}];
        $scope.pageSize = $scope.resultsPerPage[0];
        $scope.currentPage = 0;


        $scope.numberOfPages = function() {

            return Math.ceil($scope.allJobs.length / $scope.pageSize);
        };

        $scope.checkAll = function() {

            $scope.allJobs.forEach(function(job) {

                job.checked = allCheckboxes.checked;
            });
        };

        $scope.findCheckeds = function() {

            var idsJobs = [];

            $scope.allJobs.forEach(function(job) {

                if (job.checked === true) {

                    idsJobs.push(job.id_puesto);
                }
            });
            return idsJobs;
        };

        /*
         * LEER UN USUARIO
         */

        $scope.readJob = function(id_job) {

            var baseJob = Restangular.one('Puesto', id_job);

            baseJob.getList().then(function(job) {
                $scope.Job = job;
            });
        }, error (function() {
            
            alert("Error en la lectura");
        });

        /*
         * BORRAR USUARIOS
         */

        $scope.deleteJob = function(id_job) {

            Restangular.one('Puesto', id_job).remove();

            $scope.allJobs.forEach(function(job) {

                if (job.id_puesto === id_job) {

                    $scope.allJobs.splice($scope.allJobs.indexOf(job), 1);
                }
            });

        }, error (function() {
            
            alert("Error en borrado");
        });

        $scope.deleteJobs = function(ids_jobs) {

            Restangular.one('Puesto', ids_jobs.toString()).remove();

            ids_jobs.forEach(function(id_job) {

                $scope.allJobs.forEach(function(job) {

                    if (job.id_puesto === id_job) {

                        $scope.allJobs.splice($scope.allJobs.indexOf(job), 1);
                    }
                });

            });
        }, error (function() {
            
            alert("Error en borrado");
        });

        /*
         * INSERTA UN USUARIO
         */

        $scope.insertJob = function() {

            var baseJobs = Restangular.all('Puesto');

            baseJobs.post($scope.oneJob);

            $scope.oneJob = {};

            $scope.readAllJobs();
        }, error (function() {
            
            alert("Error al insertar");
        });


        /*
         * EDITAR UN USUARIO
         */

        $scope.editJob = function(id_job) {

            $scope.selection = "edition";
            
            var job = Restangular.one('Familia', id_job).get();
            
            job = $scope.oneJobEdit;
            
            job.put();
            
            $scope.readAllJobs();
        }, error (function() {
            
            alert("Error al editar");
        });
    }
]);