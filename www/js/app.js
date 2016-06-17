var app = angular.module('omantour', ['ionic', 'ngCordova', 'ngAnimate'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    /*if($window.MobileAccessibility){
        $window.MobileAccessibility.usePreferredTextZoom(false);
    }*/
    if(window.StatusBar) {
      StatusBar.styleDefault();
      $rootScope.$state = $state;
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
       $stateProvider
           .state('splash', {
               url: '/splash',
               templateUrl: 'templates/splash.html',
               controller: 'AppController'
           })
           .state('touristSignUp', {
               url: '/touristSignUp',
               templateUrl: 'templates/tourist/signUp.html',
               controller: 'TouristSignUpController'
           })
           .state('towns', {
               url: '/towns',
               templateUrl: 'templates/tourist/towns.html',
               controller: 'TownsController'
           })
           .state('town', {
               url: '/town',
               templateUrl: 'templates/tourist/town.html',
               controller: 'TownController',
               resolve:{
                 allTownImages: function(ApiFactory){
                   return ApiFactory.getImages("547654765", "town");
                 }
               },
               params: {
                 id: null,
                 name: null
               }
           })
           .state('map',{
             url:'/map',
             templateUrl:'templates/tourist/map.html',
             controller:'MapController'
           });
       $urlRouterProvider.otherwise('/splash');
   })

.directive("townlist",function($rootScope, $state, ApiFactory) {
   return {
     restrict: 'E',
     template: '<select ng-model="selectedTown" ng-change="selectTown(selectedTown)" ng-options="item.id as item.name for item in allTowns" required><option value="">Select Town</option></select>',
     controller: function($scope, $state, $rootScope) {
       $scope.selectTown = $rootScope.currentTown;
        ApiFactory.getTowns().then(function(resp){
        $scope.allTowns = resp.data;
        $scope.selectedTown = $scope.allTowns.length > 0 ? $scope.allTowns[0] : undefined;
       }, function(err){ console.log(err);});
       $scope.selectTown = function(item){
          $rootScope.currentTown = {id:item, name: $scope.allTowns.filter(function(elm){return elm.id == item})[0].name}
          $state.go("town", $rootScope.currentTown )
       }
     }
   }
 })
 .filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
