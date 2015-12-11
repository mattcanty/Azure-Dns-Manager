"use strict";
angular.module("todoApp", ["ngRoute", "AdalAngular"])
    .config([
        "$routeProvider",
        "$httpProvider",
        "adalAuthenticationServiceProvider",
        function($routeProvider, $httpProvider, adalProvider) {
            $routeProvider.when("/Home", {
                controller: "homeCtrl",
                templateUrl: "~/../App/Views/Home.html",
                requireADLogin: true,
            }).when("/Settings", {
                controller: "settingsCtrl",
                templateUrl: "~/../App/Views/Settings.html",
            }).otherwise({ redirectTo: "/Settings" });

            var conf = {
                instance: "https://login.microsoftonline.com/",
                tenant: localStorage.getItem('tenant'),
                clientId: localStorage.getItem('clientId'),
                extraQueryParameter: "nux=1",
                loginResource: "https://management.azure.com/"
            };

            adalProvider.init(conf, $httpProvider);
        }
    ]);
