"use strict";
angular.module("todoApp", ["ngRoute", "AdalAngular"])
    .config([
        "$routeProvider",
        "$httpProvider",
        "adalAuthenticationServiceProvider",
        function($routeProvider, $httpProvider, adalProvider) {
            $routeProvider.when("/", {
                controller: "homeCtrl",
                templateUrl: "~/../App/Views/Home.html",
                requireADLogin: true,
            }).otherwise({ redirectTo: "/settings.html" });

            var tenant = localStorage.getItem('tenant');
            var clientId = localStorage.getItem('clientId');

            if (!tenant || !clientId){
              var issues = [];

              if(!tenant) issues.push('tenant');
              if(!clientId) issues.push('clientId');

              window.location.href = "/settings.html?issues=" + issues.join();
            }

            var conf = {
                instance: "https://login.microsoftonline.com/",
                tenant: tenant,
                clientId: clientId,
                extraQueryParameter: "nux=1",
                loginResource: "https://management.azure.com/"
            };

            adalProvider.init(conf, $httpProvider);
        }
    ]);
