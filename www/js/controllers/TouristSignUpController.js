app
.controller("TouristSignUpController", function($scope, $stateParams, $state, $http, $ionicLoading, ApiFactory, LocalFactory) {
  $ionicLoading.show();
  $scope.go = function(state){
    $state.go(state);
  }
  var user = LocalFactory.getUser()
  if(user && user.hasOwnProperty("id") && user.id && user.id.length > -1){
    var goTo = (LocalFactory.getUser().type == "tourist") ? "towns" : "MainCompany";
    //$state.go(goTo);
    //return;
  }
  console.log("okokokx");
  ApiFactory.getCountries().then(function(resp){
    console.log(resp.data);
    $scope.allCountries = resp.data;
    $ionicLoading.hide();
  }, function(err){
    console.log(err);
  });
  $scope.saveTourist = function(tourist){
    $ionicLoading.show().then(function(){
      console.log("The loading indicator is now displayed");
    });
    error = false
    if(!tourist.fullname && tourist.fullname.length <= -1){
      error = true;
    }
    console.log(tourist.phone);
    if(!tourist.phone && tourist.phone.length <= -1){
      error = true;
    }
    if(!tourist.email && tourist.email.length <= -1){
      error = true;
    }
    if(!tourist.country && tourist.country.length <= -1){
      error = true;
    }
    if(!tourist.escorts && tourist.escort.length <= -1){
      error = true;
    }
    if(!tourist.from && tourist.from.length <= -1){
      error = true;
    }
    if(!tourist.to && tourist.to.length <= -1){
      error = true;
    }
    if(!error){
        tourist["regestrationDate"] = Date.now();
        tourist["os"] = (ionic.Platform.isIOS()) ? "IOS" : (ionic.Platform.isAndroid()) ? "Android" : "webview";
        ApiFactory.setTourist(tourist).then(function(resp){
          LocalFactory.setUser({
            id: resp.data.id,
            "first_name": resp.data.fullname,
            type:"tourist"
          })
          $ionicLoading.hide();
          $state.go("towns");
        }, function(err){
          console.log(err);
        });
    }
  }
});
