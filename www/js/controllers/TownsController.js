app
.controller("TownsController", function($scope, $stateParams, $state, $stateParams, ApiFactory, LocalFactory) {
  $scope.full_name = LocalFactory.getUser()["first_name"];
  $scope.go = function(state, params){
    $state.go(state);
  }
  /*ApiFactory.getTowns().then(function(resp){
    $scope.allTowns = resp.data;
      $scope.selectedTown = $scope.allTowns.length > 0 ? $scope.allTowns[0] : undefined;
  }, function(err){ console.log(err);});
  $scope.selectTown = function(item){
    $state.go("town", {id:item, name: $scope.allTowns.filter(function(elm){return elm.id == item})[0].name})
  }*/
});
