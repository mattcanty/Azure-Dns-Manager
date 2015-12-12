(function(){
"use strict";

var defaultRecordTypes = {
  'A':{"TTL": 3600,"ARecords":[{"ipv4Address": ""}]},
  'AAAA':{"TTL": 3600,"AAAARecords": [{"ipv6Address": ""}]},
  'CNAME':{"TTL": 3600,"CNAMERecord": {"cname": ""}},
  'MX':{"TTL": 3600,"MXRecords": [{"preference": "10"}]},
  'SOA':{"TTL": 3600,"SOARecord": {"email": "","expireTime": 604800,"host": "","minimumTTL": 300,"refreshTime": 900,"retryTime": 300}},
  'NS':{"TTL": 3600,"NSRecords":[{"nsdname": ""}]},
  'SRV':{"TTL": 3600,"SRVRecords":[{"priority": 1,"weight": 5,"port": 80,"target":""}]},
  'TXT':{"TTL":3600,"TXTRecords":[{"value":""}]},
};

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

            //$scope.recordSets = [{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/SOA/@","name":"@","type":"Microsoft.Network/dnszones","etag":"be24dc2d-5ba2-4c1c-9b17-f09b4e21e028","location":"global","properties":{"fqdn":"@.tandem.ninja","TTL":3600,"SOARecord":{"email":"msnhst.microsoft.com","expireTime":2419200,"host":"ns1-04.azure-dns.com.","minimumTTL":300,"refreshTime":3600,"retryTime":300}},"$$hashKey":"01L"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/NS/@","name":"@","type":"Microsoft.Network/dnszones","etag":"7e69ba27-67c4-4a8f-8eed-0df98280594c","location":"global","properties":{"fqdn":"@.tandem.ninja","TTL":3600,"NSRecords":[{"nsdname":"ns1-04.azure-dns.com."},{"nsdname":"ns2-04.azure-dns.net."},{"nsdname":"ns3-04.azure-dns.org."},{"nsdname":"ns4-04.azure-dns.info."}]},"$$hashKey":"01M"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/MX/@","name":"@","type":"Microsoft.Network/dnszones/MX","etag":"dc149aab-9075-46bd-9584-42e55c226254","location":"global","properties":{"fqdn":"@.tandem.ninja","TTL":3600,"MXRecords":[{"exchange":"ASPMX.L.GOOGLE.COM","preference":1},{"exchange":"ALT1.ASPMX.L.GOOGLE.COM","preference":5},{"exchange":"ALT2.ASPMX.L.GOOGLE.COM","preference":5},{"exchange":"ASPMX2.GOOGLEMAIL.COM","preference":10},{"exchange":"ASPMX3.GOOGLEMAIL.COM","preference":10}]},"$$hashKey":"01N"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/TXT/@","name":"@","type":"Microsoft.Network/dnszones/TXT","etag":"1ee4efd4-2db4-4127-9972-f422704b7a79","location":"global","properties":{"fqdn":"@.tandem.ninja","TTL":3600,"TXTRecords":[{"value":"google-site-verification=rBv02cdYjXXsorpx04M1R1196GLybkwN4YFGU4PBsg0"}]},"$$hashKey":"01O"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/activityfeed-dev","name":"activityfeed-dev","type":"Microsoft.Network/dnszones/CNAME","etag":"f34ef274-c32c-44c5-8fdc-30f416a98349","location":"global","properties":{"fqdn":"activityfeed-dev.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"dev-web.westeurope.cloudapp.azure.com"}},"$$hashKey":"01P"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/api-dev","name":"api-dev","type":"Microsoft.Network/dnszones/CNAME","etag":"53db1b66-bcd2-470d-b912-951336fb11c7","location":"global","properties":{"fqdn":"api-dev.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"dev-web.westeurope.cloudapp.azure.com"}},"$$hashKey":"01Q"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/bank-dev","name":"bank-dev","type":"Microsoft.Network/dnszones/CNAME","etag":"e491c84d-50f1-48b5-8aca-f1856ffed73f","location":"global","properties":{"fqdn":"bank-dev.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"dev-web.westeurope.cloudapp.azure.com"}},"$$hashKey":"01R"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/build","name":"build","type":"Microsoft.Network/dnszones/CNAME","etag":"bde55a2f-bfd3-4f88-89cc-07bb7ac8c87b","location":"global","properties":{"fqdn":"build.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"goodserver.westeurope.cloudapp.azure.com"}},"$$hashKey":"01S"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/config-dev","name":"config-dev","type":"Microsoft.Network/dnszones/CNAME","etag":"9c3532ed-7cd1-49e0-97b1-5a9570acdad3","location":"global","properties":{"fqdn":"config-dev.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"dev-web.westeurope.cloudapp.azure.com"}},"$$hashKey":"01T"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/*.dev","name":"*.dev","type":"Microsoft.Network/dnszones/CNAME","etag":"bd9c7e3e-2f20-418c-bae8-0c3a3f3a9b80","location":"global","properties":{"fqdn":"*.dev.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"dev-web.westeurope.cloudapp.azure.com"}},"$$hashKey":"01U"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/mobiliti.dev","name":"mobiliti.dev","type":"Microsoft.Network/dnszones/CNAME","etag":"fe743d7b-274a-4f7b-b070-db4769299cb1","location":"global","properties":{"fqdn":"mobiliti.dev.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"mobiliti.westeurope.cloudapp.azure.com"}},"$$hashKey":"01V"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/sql.dev","name":"sql.dev","type":"Microsoft.Network/dnszones/CNAME","etag":"212c3d9d-59db-42a0-b32b-b3caaf38a07f","location":"global","properties":{"fqdn":"sql.dev.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"dev-sql.westeurope.cloudapp.azure.com"}},"$$hashKey":"01W"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/elastic-dev","name":"elastic-dev","type":"Microsoft.Network/dnszones/CNAME","etag":"ab9847cf-bfcb-49c2-938e-4f29b43ede0e","location":"global","properties":{"fqdn":"elastic-dev.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"dev-sql.westeurope.cloudapp.azure.com"}},"$$hashKey":"01X"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/ftp","name":"ftp","type":"Microsoft.Network/dnszones/CNAME","etag":"4c9d9cfe-8be3-485b-8c56-a1fb35e01047","location":"global","properties":{"fqdn":"ftp.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"bitbucketserver.westeurope.cloudapp.azure.com"}},"$$hashKey":"01Y"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/identity-dev","name":"identity-dev","type":"Microsoft.Network/dnszones/CNAME","etag":"dbc0f5bf-8164-4a21-935e-e0ad6eb4b03f","location":"global","properties":{"fqdn":"identity-dev.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"dev-web.westeurope.cloudapp.azure.com"}},"$$hashKey":"01Z"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/jira","name":"jira","type":"Microsoft.Network/dnszones/CNAME","etag":"fd293120-b6bc-4178-99e0-98b32feb62dc","location":"global","properties":{"fqdn":"jira.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"jira.atlassian.com"}},"$$hashKey":"020"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/labs","name":"labs","type":"Microsoft.Network/dnszones/CNAME","etag":"dd9af4f9-294d-48db-a8fb-1c5eeaa7947f","location":"global","properties":{"fqdn":"labs.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"dev-web.westeurope.cloudapp.azure.com"}},"$$hashKey":"021"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/MX/mail","name":"mail","type":"Microsoft.Network/dnszones/MX","etag":"227f4514-ba3d-49a5-9628-d013bafcc7e4","location":"global","properties":{"fqdn":"mail.tandem.ninja","TTL":3600,"MXRecords":[]},"$$hashKey":"022"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/masteraccounts-dev","name":"masteraccounts-dev","type":"Microsoft.Network/dnszones/CNAME","etag":"7cf24804-0846-4c86-9e38-b3d21ed1bba4","location":"global","properties":{"fqdn":"masteraccounts-dev.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"dev-web.westeurope.cloudapp.azure.com"}},"$$hashKey":"023"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/midata-dev","name":"midata-dev","type":"Microsoft.Network/dnszones/CNAME","etag":"e88a012d-ad67-4828-8388-cf19075f4c50","location":"global","properties":{"fqdn":"midata-dev.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"dev-web.westeurope.cloudapp.azure.com"}},"$$hashKey":"024"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/mobiliti-dev","name":"mobiliti-dev","type":"Microsoft.Network/dnszones/CNAME","etag":"34224289-e692-4106-b5d8-0a07d756ca21","location":"global","properties":{"fqdn":"mobiliti-dev.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"mobiliti.westeurope.cloudapp.azure.com"}},"$$hashKey":"025"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/mobiliti-uat","name":"mobiliti-uat","type":"Microsoft.Network/dnszones/CNAME","etag":"6a2766b1-57c9-4cac-a048-2b7de581e06e","location":"global","tags":{},"properties":{"fqdn":"mobiliti-uat.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"mobiliti-uat.westeurope.cloudapp.azure.com"}},"$$hashKey":"026"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/mobilitiapi-dev","name":"mobilitiapi-dev","type":"Microsoft.Network/dnszones/CNAME","etag":"033105de-1eb4-41d4-82e9-1922952cdd59","location":"global","properties":{"fqdn":"mobilitiapi-dev.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"dev-web.westeurope.cloudapp.azure.com"}},"$$hashKey":"027"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/mobilitilogs-dev","name":"mobilitilogs-dev","type":"Microsoft.Network/dnszones/CNAME","etag":"2398deff-78a4-456d-8cdb-b31a41481911","location":"global","properties":{"fqdn":"mobilitilogs-dev.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"mobiliti.westeurope.cloudapp.azure.com"}},"$$hashKey":"028"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/nudges-dev","name":"nudges-dev","type":"Microsoft.Network/dnszones/CNAME","etag":"1a7096e6-607d-41af-a26a-854c9ce1d86c","location":"global","properties":{"fqdn":"nudges-dev.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"dev-web.westeurope.cloudapp.azure.com"}},"$$hashKey":"029"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/nuget","name":"nuget","type":"Microsoft.Network/dnszones/CNAME","etag":"3fb67349-e2fb-49a4-8540-c5ea99e1cd5b","location":"global","properties":{"fqdn":"nuget.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"bitbucketserver.westeurope.cloudapp.azure.com"}},"$$hashKey":"02A"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/products-dev","name":"products-dev","type":"Microsoft.Network/dnszones/CNAME","etag":"31c6a60b-1abc-40e7-9285-c312ac77437b","location":"global","properties":{"fqdn":"products-dev.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"dev-web.westeurope.cloudapp.azure.com"}},"$$hashKey":"02B"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/public-dev","name":"public-dev","type":"Microsoft.Network/dnszones/CNAME","etag":"451b72c9-1d13-464a-b90c-a785219be93a","location":"global","properties":{"fqdn":"public-dev.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"public-dev.azurewebsites.net"}},"$$hashKey":"02C"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/repo","name":"repo","type":"Microsoft.Network/dnszones/CNAME","etag":"e92f9ecf-2e8e-4633-bc6c-15b62ee8e62d","location":"global","properties":{"fqdn":"repo.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"bitbucketserver.westeurope.cloudapp.azure.com"}},"$$hashKey":"02D"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/sql-dev","name":"sql-dev","type":"Microsoft.Network/dnszones/CNAME","etag":"c6923ec0-979b-4fdd-a1c3-d5e869f9735e","location":"global","properties":{"fqdn":"sql-dev.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"dev-sql.westeurope.cloudapp.azure.com"}},"$$hashKey":"02E"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/test","name":"test","type":"Microsoft.Network/dnszones/CNAME","etag":"d91c38fb-a480-4529-8584-328384576975","location":"global","tags":{},"properties":{"fqdn":"test.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"dev-web.westeurope.cloudapp.azure.com"}},"$$hashKey":"02F"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/web-dev","name":"web-dev","type":"Microsoft.Network/dnszones/CNAME","etag":"b0161dc8-fca5-45a0-8f69-4c5d38e46771","location":"global","properties":{"fqdn":"web-dev.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"dev-web.westeurope.cloudapp.azure.com"}},"$$hashKey":"02G"},{"id":"/subscriptions/23f61b54-0eb4-410a-9512-7d69f5e3ae4b/resourceGroups/dns/providers/Microsoft.Network/dnszones/tandem.ninja/CNAME/webviews-dev","name":"webviews-dev","type":"Microsoft.Network/dnszones/CNAME","etag":"f13b9fb6-4e04-4970-b3d8-57ab1473be15","location":"global","properties":{"fqdn":"webviews-dev.tandem.ninja","TTL":3600,"CNAMERecord":{"cname":"dev-web.westeurope.cloudapp.azure.com"}},"$$hashKey":"02H"}];
            //console.debug($scope.recordSets);
            //return;

            $scope.save = function(recordSet){
              put(recordSet, "https://management.azure.com/" + recordSet.id + "?api-version=2015-05-04-preview");
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
                  $scope.recordSets = response.data.value;
                });
            }

            $scope.pushNewRecordSet = function(){
              var id = "/subscriptions/" + $scope.subscription.subscriptionId + "/resourceGroups/" + $scope.resource.name + "/providers/Microsoft.Network/dnszones/" + $scope.zone.name + "/" + $scope.newRecord.type + "/" + $scope.newRecord.name;

              $scope.recordSets.unshift({
                "id": id,
                "location": "global",
                "name": $scope.newRecord.name,
                "tags": {},
                "properties": defaultRecordTypes[$scope.newRecord.type]
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
})();
