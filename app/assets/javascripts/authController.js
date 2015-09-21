app.controller("AuthCtrl", ["$scope", "Auth", function($scope, Auth){
  $scope.username = "";
  $scope.password = "";
  $scope.loggedIn = Auth.isAuthenticated();
  $scope.currentUser = {};

  $scope.signIn = function(){
    var credentials = {
        username: $scope.username,
        password: $scope.password,
    };

    var config = {
        headers: {
            'X-HTTP-Method-Override': 'POST'
        }
    };

    Auth.login(credentials, config).then(function(user) {
      // console.log(user); // => {id: 1, ect: '...'}
      $scope.loggedIn = true;
      $scope.currentUser = user;
    }, function(error) {
      $scope.loggedIn = false;
    });

  }
}])
