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
     //template: '<select ng-model="selectedTown" ng-change="selectTown(selectedTown)" ng-options="item for item in allTowns" required><option value="">Select Town</option></select>',
     templateUrl: 'templates/directives/townlist.html',
     controller: function($scope, $state, $rootScope, $ionicScrollDelegate) {
       //$scope.selectTown = $rootScope.currentTown;
       $scope.fulllisttown = false;
       $scope.showList = function(){
         console.log("ok");
         $scope.fulllisttown = true;
         //scope.$apply();
       }
        $scope.selectedTown = 'Select a towns'
        ApiFactory.getTowns().then(function(resp){
         $scope.allTowns = resp.data[0].data;
       }, function(err){ console.log(err);});
       $scope.selectTown = function(item){
          $rootScope.currentTown = item;
          $scope.selectedTown = item;
          $scope.fulllisttown = false;
          $ionicScrollDelegate.scrollTop();
          //$state.go("town", item )
       }
     },
     link: function(scope){

     }
   }
 })
 .filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
