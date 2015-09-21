var app = angular.module('app', ['ui.router', 'restangular'])

.config(["RestangularProvider", function(RestangularProvider){
  RestangularProvider.setBaseUrl("/api/v1")
  RestangularProvider.setRequestSuffix(".json")

}])

.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/pins');

    $stateProvider
      .state('pins', {
        url: "/pins",
        templateUrl: "templates/pins.html",
        controller: "PinCtrl",
        resolve: {
          pins: ['Restangular', function(Restangular){
            return Restangular.all("pins").getList().$object
          }]
        }
      })
  }])
