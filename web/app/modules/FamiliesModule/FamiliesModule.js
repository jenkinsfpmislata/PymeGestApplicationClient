/*
 * Project: PymeGestApplicationClient
 * File: FamilyModule.js
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

angular.module('FamiliesModule', [
    'restangular'
])
        .config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/PymeGestApplicationServer/api/');
    
    RestangularProvider.addElementTransformer('Familia', false, function(family) {

        family.disabled = true;
        family.checked = false;
        
        return family;
    });
});