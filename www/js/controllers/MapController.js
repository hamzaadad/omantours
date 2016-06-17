app
.controller("MapController", function($scope, $stateParams, $state, $http, $ionicLoading, $ionicHistory, $cordovaGeolocation, ApiFactory, LocalFactory) {
  $ionicLoading.show();
  $scope.back = function(){
     $ionicHistory.goBack()
  }

  var options = {timeout: 10000, enableHighAccuracy: true};
 $cordovaGeolocation.getCurrentPosition(options).then(function(position){

   var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

   $scope.map = new google.maps.Map(document.getElementById("map"), {
     center: latLng,
     zoom: 15,
     mapTypeId: google.maps.MapTypeId.ROADMAP
   });
   google.maps.event.addListenerOnce($scope.map, 'idle', function(){
     var marker = new google.maps.Marker({
         map: $scope.map,
         animation: google.maps.Animation.DROP,
         position: latLng
     });
     var infoWindow = new google.maps.InfoWindow({
          content: "Here you are!"
      })
      infoWindow.open($scope.map, marker);
      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
      });
     $ionicLoading.hide();
   });
 }, function(error){
   console.log("Could not get location");
 });

});
