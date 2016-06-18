app
.controller("TouristSignUpController", function($scope, $stateParams, $state, $http, $ionicLoading, $ionicPopup, ApiFactory, LocalFactory) {
  //$ionicLoading.show();
  $scope.full_name = LocalFactory.getUser()['first_name'];
  $scope.go = function(state){
    $state.go(state);
  }

  $scope.formateLange = function(langdata){
     $scope.perosnal = langdata.data.tourist.signUp.perosnal;
     $scope.trip = langdata.data.tourist.signUp.trip;
     $scope.signup = langdata.data.tourist.signUp.signup;
     $scope.skip = langdata.data.tourist.signUp.skip;
     $scope.placeholder = langdata.data.tourist.signUp.placeholders;
   }

   $scope.changelanguage = function(name){
     $ionicLoading.hide();
     $ionicLoading.show();
     ApiFactory.getLanguage(name).then(function(resp){
       LocalFactory.setLanguage(resp.data);
       $scope.formateLange(resp.data[0]);
       $ionicLoading.hide();
     }, function(err){
       console.log(err);
     })
   }
  var user = LocalFactory.getUser()
  if(user && user.hasOwnProperty("id") && user.id && user.id.length > -1){
    var goTo = (LocalFactory.getUser().type == "tourist") ? "towns" : "MainCompany";
    //$state.go(goTo);
  }
  if(!LocalFactory.getLanguage()){
    console.log("in changeing language");
    $scope.changelanguage("eng");
  }else{
    $scope.formateLange(LocalFactory.getLanguage()[0]);
  }
  var langData = LocalFactory.getData('countries');
  if(!langData){
    ApiFactory.getCountries().then(function(resp){
      $scope.allCountries = resp.data;
      LocalFactory.setData('countries', resp.data);
      $ionicLoading.hide();
    }, function(err){
      console.log(err);
    });
  }else{
    $scope.allCountries = langData;
  }
  $scope.saveTourist = function(tourist){
    $ionicLoading.show();
    error = false
    if(tourist){
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
      }else{
        $ionicLoading.hide();
        $ionicPopup.alert("Please fill all the informations!")
        //ionic alert error

      }
    }else{
      $ionicLoading.hide();
      $ionicPopup.alert({
        "title":"Validation failed",
        "template":"<div class='alert'>Could you please validate all informations!</div>"
      })
    }

  }
});
