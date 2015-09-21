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

app.controller("PinEditCtrl", ["$scope", "pin", "Restangular", function($scope, pin, Restangular){
  console.log(pin);
  $scope.editPin = pin;
  $scope.updatePin = function(){
  Restangular.one('pins', pin.id).get().then(function(currentPin){
                                  $scope.pin = currentPin;
                                  $scope.pin.item_name = $scope.editPin.item_name
                                  $scope.pin.buy_sell = $scope.editPin.buy_sell == "true" ? true : false
                                  $scope.pin.description = $scope.editPin.description

                                  $scope.pin.put();
                                });
 }
}])
