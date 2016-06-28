app
.controller("TownController", function($scope, $stateParams, $state, $stateParams, $ionicLoading, ApiFactory, LocalFactory, allTownImages) {
  $scope.full_name = LocalFactory.getUser()["first_name"];
  $scope.state = $state
  $scope.go = function(state){
    $state.go(state);
  }


  $scope.formateLange = function(langdata){
     $scope.welcom = langdata.data.town.welcom;
     $scope.lang = langdata.data.town;

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

   if(!LocalFactory.getLanguage()){
     $scope.changelanguage("eng");
   }else{
     $scope.formateLange(LocalFactory.getLanguage()[0]);
     $ionicLoading.hide();
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


  if(!$stateParams.hasOwnProperty("id") || !$stateParams.hasOwnProperty("name") || $stateParams.id == null ){
    //$state.go('towns');
    //return;
  }
  $ionicLoading.show({
    template: 'Loading...'
  }).then(function(){
    console.log("The loading indicator is now displayed");
  });
  console.log($stateParams);
  $scope.town_name = $stateParams.name;
  //$scope.images=  allTownImages.data[0].images[1].data;

  $ionicLoading.hide();
});
