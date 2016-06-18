app
.controller("AppController", function($rootScope, $scope, $stateParams, $state, $ionicLoading, ApiFactory, LocalFactory) {
  $ionicLoading.show();
  $scope.usersCount = 0;
  $scope.companiesCount = 0;
  $scope.isfulllang = false;
  $scope.go = function(state){
    $state.go(state);
  }
  $scope.toggleLangSelector = function(){
      $scope.isfulllang = !$scope.isfulllang;
  }
  $scope.selectlanguage = function(langObj){
    $scope.changelanguage(langObj.name)
    $scope.toggleLangSelector();
  }
  $scope.formateLange = function(langObj){
    console.log("formateLange", langObj);
    $scope.selectedlanguage = langObj.name;
    $scope.maptext = langObj.data.splash.map;
    $scope.tourist = langObj.data.splash.tourist;
    $scope.company = langObj.data.splash.company;
      $scope.language = langObj.data.splash.language;
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
  ApiFactory.getLanguages().then(function(resp){
    $scope.languages = resp.data;
  },function(err){
    console.log(err);
  })
  if(!LocalFactory.getLanguage()){
    $scope.changelanguage("eng");
  }else{
    $ionicLoading.hide();
    console.log(LocalFactory.getLanguage()[0]);
    $scope.formateLange(LocalFactory.getLanguage()[0]);
  }

  ApiFactory.getStates().then(function(resp){
    if(resp.data.hasOwnProperty("tourist") && resp.data.tourist){
      console.log(resp.data);
      $scope.usersCount = resp.data.tourist
    }
    if(resp.data.hasOwnProperty("companies") && resp.data.companies){
      $scope. companiesCount = resp.data.companies
    }
  },function(err){
    console.log(err);
  });

});
