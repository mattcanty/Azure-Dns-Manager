"use strict";
angular.module("todoApp")
    .controller("homeCtrl", [
        "$scope",
        "adalAuthenticationService",
        "$location",
        "$window",
        "$http",
        "$filter",
        "$interval",
        function ($scope, adalService, $location, $window, $http, $filter, $interval) {
            $scope.login = function() {
                adalService.login();
            };
            $scope.logout = function() {
                adalService.logOut();
            };
            $scope.isActive = function(viewLocation) {
                return viewLocation === $location.path();
            };

            $scope.bearerToken = $window.sessionStorage["adal.access.token.keyhttps://management.azure.com/"];

            var get = function(url, success) {
                var req = {
                    method: "GET",
                    url: url,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer" + $scope.bearerToken
                    }
                }

                $http(req).then(success, console.error);
            }

            var put = function(data, url, success) {
              var req = {
                  method: "PUT",
                  url: url,
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": "Bearer" + $scope.bearerToken
                  },
                  data: data
              }

              $http(req).then(success, console.error);
            }

            $scope.save = function(recordSet){
              put(recordSet, "https://management.azure.com/" + recordSet.id + "?api-version=2015-05-04-preview",
              function(response){
                console.debug(response)
              })
            }

            $scope.getSubscriptions = function() {
              if($scope.subscriptions) return;

              get("https://management.azure.com/subscriptions?api-version=anything",
                function (response) {
                  $scope.subscriptions = response.data.value;

                  var savedId = $window.localStorage.getItem("subscription.id");

                  if(savedId){
                    $scope.subscription = $filter('filter')($scope.subscriptions, {id:savedId})[0];
                  }
                });
            }

            $scope.getResources = function() {
              if (!$scope.subscription) return;

              get("https://management.azure.com/subscriptions/" + $scope.subscription.subscriptionId + "/resourceGroups?api-version=2014-04",
                function (response) {
                  $scope.resources = response.data.value;

                  var savedId = $window.localStorage.getItem("resource.id");

                  if(savedId){
                    $scope.resource = $filter('filter')($scope.resources, {id:savedId})[0];
                  }
                });
            };

            $scope.getZones = function() {
              if (!$scope.resource) return;

              get("https://management.azure.com/subscriptions/" + $scope.subscription.subscriptionId + "/resourceGroups/" + $scope.resource.name + "/providers/Microsoft.Network/dnsZones?api-version=2015-05-04-preview",
                function (response) {
                  $scope.zones = response.data.value;

                  var savedId = $window.localStorage.getItem("zone.id");

                  if(savedId){
                    $scope.zone = $filter('filter')($scope.zones, {id:savedId})[0];
                  }
                });
            };

            $scope.getRecordSets = function() {
              if(!$scope.zone) return;

              get("https://management.azure.com/subscriptions/" + $scope.subscription.subscriptionId + "/resourceGroups/" + $scope.resource.name + "/providers/Microsoft.Network/dnsZones/" + $scope.zone.name + "/recordSets?api-version=2015-05-04-preview",
                function (response){
                  console.debug(response);
                  $scope.recordSets = response.data.value;
                });
            }

            $scope.pushNewRecordSet = function(recordSetType){
              var id = "/subscriptions/" + $scope.subscription.subscriptionId + "/resourceGroups/" + $scope.resource.name + "/providers/Microsoft.Network/dnszones/" + $scope.zone.name + "/" + $scope.newRecord.type + "/" + $scope.newRecord.name;

              console.debug('adding ' + id)

              $scope.recordSets.unshift({
                "id": id,
                "location": "global",
                "name": $scope.newRecord.name,
                "tags": {},
                "properties": {
                   "TTL": 3600
                }
              });
            }

            $scope.$watch('subscription', function(newValue){
              if(newValue === undefined) return;
              $window.localStorage.setItem('subscription.id', $scope.subscription.id);
              $scope.getResources();
            });
            $scope.$watch('resource', function(newValue){
              if(newValue === undefined) return;
              $window.localStorage.setItem('resource.id', $scope.resource.id);
              $scope.getZones();
            });
            $scope.$watch('zone', function(newValue){
              if(newValue === undefined) return;
              $window.localStorage.setItem('zone.id', $scope.zone.id);
              $scope.getRecordSets();
            });

            var stop = $interval(function(){
              if ($scope.userInfo.isAuthenticated){
                $scope.getSubscriptions();
                $interval.cancel(stop);
              }
            }, 500);
        }
    ])
    .directive("dnsArrayRecord", function() {
        return {
            restrict: "E",
            scope: {
              records: '=',
              something: '=',
              properties: '='
            },
            templateUrl: 'App/Templates/DnsArrayRecord.html?4'
        }
    });
