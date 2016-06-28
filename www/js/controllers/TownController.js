app
.controller("TownController", function($scope, $stateParams, $state, $stateParams, $ionicLoading, ApiFactory, LocalFactory, allTownImages) {
  $scope.full_name = LocalFactory.getUser()["first_name"];
  $scope.state = $state
  $scope.go = function(state){
    $state.go(state);
  }

$scope.town_name = $stateParams.name;
  var cats = {
    1:11,
    2:22,
    3:33
  }
  $scope.formateLange = function(langdata){
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


   $scope.cat = function(id){
     console.log(cats[id]);
     if(!id){
       return;
     }
     $state.go('category', {
       name:cats[id],
       id:id
     });
   }
});
