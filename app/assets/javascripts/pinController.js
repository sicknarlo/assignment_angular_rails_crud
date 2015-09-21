app.controller("PinCtrl", ["$scope", "pins", "Restangular", "$location", 'UserService', function($scope, pins, Restangular, $location, UserService){
  $scope.pins = pins;
  $scope.newPin = { action: "true" }
  $scope.loggedIn = UserService.loggedIn;

  $scope.currentUser = UserService.currentUser;

  $scope.addPin = function(){
    Restangular.all('pins').post({ pin : {item_name: $scope.newPin.title,
                                          buy_sell: $scope.newPin.action,
                                          description: $scope.newPin.desc,
                                          user_id: 1,
                                          }
                                }).then(function(newPin){
                                  $scope.pins.push(newPin);
                                  $scope.newPin = {};
                                });

  }

  $scope.removePin = function(id){
    Restangular.one('pins', id).get().then(function(currentPin){
                                        currentPin.remove();
                                        if ($scope.pins){
                                          $scope.pins = $scope.pins.filter(function(el){
                                          return el.id != id
                                          })
                                        } else {
                                          $location.path('/pins/index');
                                        }
                                      })
  }

}])

app.controller("PinShowCtrl", ["$scope", "pin", "Restangular", "$location", function($scope, pin, Restangular, $location){
  $scope.pin = pin;
  $scope.removePin = function(){
    Restangular.one('pins', pin.id).get().then(function(currentPin){
                                            currentPin.remove();
                                            $location.path('/pins/index');
                                          })
  }

}])

app.controller("PinEditCtrl", ["$scope", "pin", "Restangular", "$location", function($scope, pin, Restangular, $location){
  $scope.editPin = pin;
  $scope.updatePin = function(){
  Restangular.one('pins', pin.id).get().then(function(currentPin){
                                  console.log(currentPin);
                                  $scope.pin = currentPin;
                                  $scope.pin.item_name = $scope.editPin.item_name
                                  $scope.pin.buy_sell = $scope.editPin.buy_sell
                                  $scope.pin.description = $scope.editPin.description

                                  $scope.pin.put();
                                  $location.path('/pins/index');
                                }, function(other){
                                  console.log(other);
                                });
 }
}])
