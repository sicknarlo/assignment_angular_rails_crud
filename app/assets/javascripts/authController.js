app.controller("AuthCtrl", ["$scope", "UserService", function($scope, UserService){
  $scope.username = "";
  $scope.password = "";
  $scope.loggedIn = UserService.loggedIn;
  $scope.currentUser = UserService.currentUser;

  $scope.credentials = {
    username: $scope.username,
    password: $scope.password,
  };

  $scope.login = function(){

    var config = {
        headers: {
            'X-HTTP-Method-Override': 'POST'
        }
    };

    UserService.login($scope.credentials, config);
  }
}])
