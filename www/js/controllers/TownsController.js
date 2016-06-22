app
.controller("TownsController", function($scope, $stateParams, $state, $stateParams, $ionicLoading, ApiFactory, LocalFactory) {
$ionicLoading.show();
  $scope.full_name = LocalFactory.getUser()["first_name"];
  $scope.go = function(state, params){
    $state.go(state);
  }
  $scope.formateLange = function(langdata){
     $scope.welcom = langdata.data.towns.welcom;
     $scope.slogon = langdata.data.towns.slogon;
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
  /*ApiFactory.getTowns().then(function(resp){
    $scope.allTowns = resp.data;
      $scope.selectedTown = $scope.allTowns.length > 0 ? $scope.allTowns[0] : undefined;
  }, function(err){ console.log(err);});
  $scope.selectTown = function(item){
    $state.go("town", {id:item, name: $scope.allTowns.filter(function(elm){return elm.id == item})[0].name})
  }*/
});
