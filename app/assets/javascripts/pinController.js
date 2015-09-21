app.controller("PinCtrl", ["$scope", "pins", "Restangular", function($scope, pins, Restangular){
  $scope.pins = pins;
  $scope.newPin = { action: "true" }

  $scope.addPin = function(){
    Restangular.all('pins').post({ pin : {item_name: $scope.newPin.title,
                                          buy_sell: $scope.newPin.action == "true" ? true : false,
                                          description: $scope.newPin.desc,
                                          user_id: 1,
                                          }
                                }).then(function(newPin){
                                  $scope.pins.push(newPin);
                                  $scope.newPin = {};
                                });
  }

}])

app.controller("PinShowCtrl", ["$scope", "pin", function($scope, pin){
  $scope.pin = pin;
}])

app.controller("PinEditCtrl", ["$scope", "pin", "Restangular", function($scope, pin){
  $scope.pin = pin
  Restangular.one('pin', pin.id).post({ pin : {item_name: $scope.editPin.title,
                                          buy_sell: $scope.editPin.action == "true" ? true : false,
                                          description: $scope.editPin.desc,
                                          user_id: 1,
                                          }
                                }).then(function(editPin){
                                  $scope.editPin = editPin;
                                });
}])
