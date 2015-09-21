var app = angular.module('app', ['ui.router', 'restangular', 'devise'])

.config(["RestangularProvider", function(RestangularProvider){
  RestangularProvider.setBaseUrl("/api/v1")
  RestangularProvider.setRequestSuffix(".json")

}])

.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/pins/index');

    $stateProvider
      .state('pins', {
        url: "/pins",
        templateUrl: 'templates/pins/layout.html'
      })
      .state('pins.index', {
        url: "/index",
        templateUrl: "templates/pins/index.html",
        controller: "PinCtrl",
        resolve: {
          pins: ['Restangular', function(Restangular){
            return Restangular.all("pins").getList()
          }]
        }
      })

      .state('pins.edit', {
        url: "/edit/:id",
        templateUrl: "templates/pins/edit.html",
        controller: "PinEditCtrl",
        resolve: {
          pin: ['Restangular', '$stateParams',
          function(Restangular, $stateParams){
            return Restangular.one('pins', $stateParams.id).get();
          }]
        }
      })

      .state('pins.show', {
        url: '/:id',
        templateUrl: "templates/pins/show.html",
        controller: "PinShowCtrl",
        resolve: {
          pin: ['Restangular', '$stateParams',
          function(Restangular, $stateParams){
            return Restangular.one('pins', $stateParams.id).get();
          }]
        }
      })







      .state('sign-in', {
        url: '/signin',
        templateUrl: "templates/auth/signin.html",
        controller: "AuthCtrl"
      })
  }])
