app
.controller("TownController", function($scope, $stateParams, $state, $stateParams, $ionicLoading, ApiFactory, LocalFactory, allTownImages) {
  $scope.full_name = LocalFactory.getUser()["first_name"];
  $scope.state = $state
  $scope.go = function(state){
    $state.go(state);
  }
  if(!$stateParams.hasOwnProperty("id") || !$stateParams.hasOwnProperty("name") || $stateParams.id == null ){
    $state.go('towns');
    return;
  }
  $ionicLoading.show({
    template: 'Loading...'
  }).then(function(){
    console.log("The loading indicator is now displayed");
  });
  $scope.townname = $stateParams.name;
  $scope.images=  allTownImages.data[0].images[1].data;

  $ionicLoading.hide();
});
