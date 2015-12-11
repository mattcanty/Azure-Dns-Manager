"use strict";
angular.module("todoApp")
    .controller("settingsCtrl", [
        "$scope",
        "adalAuthenticationService",
        "$location",
        "$window",
        "$http",
        "$filter",
        function ($scope, adalService, $location, $window, $http, $filter) {

            console.debug('settingsCtrl loading')

            $scope.login = function() {
                adalService.login();
            };
            $scope.logout = function() {
                adalService.logOut();
            };
            $scope.isActive = function(viewLocation) {
                return viewLocation === $location.path();
            };

            $scope.saveSettings = function(){
              $window.localStorage.setItem('tenant', $scope.tenant);
              $window.localStorage.setItem('clientId', $scope.clientId);
            }

            $scope.tenant = $window.localStorage.getItem('tenant');
            $scope.clientId = $window.localStorage.getItem('clientId');
        }
    ]);
