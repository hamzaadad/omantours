app
.controller("CategoryController", function($scope, $stateParams, $state, $stateParams, $ionicLoading, ApiFactory, LocalFactory) {
$ionicLoading.show();
$scope.category = $stateParams.name
$ionicLoading.hide();
});
