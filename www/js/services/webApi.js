app
    .factory('ApiFactory', ['$http', function($http) {

    var urlBase = globalConfig.api;

    return {
      getStates: function(){
        return $http.get(urlBase + globalConfig.uris.states + "/" + globalConfig.statesId);
      },
      getCountries: function(){
        console.log("ok");
        return $http.get(urlBase +  globalConfig.uris.countries);
      },
      getTowns: function(){
        return $http.get(urlBase +  globalConfig.uris.town);
      },
      getImages: function(id, type){
        return $http.get(urlBase + globalConfig.uris.images +"/?parentId="+id+"&parentType="+type);
      },
      getLanguages: function(name){
        return $http.get(urlBase +  globalConfig.uris.language + "/?{\"$fields\":{\"data\":0}}");
      },
      getLanguage: function(name){
        return $http.get(urlBase +  globalConfig.uris.language + "/?name="+name);
      },
      setTourist: function(data){
        return $http.post(urlBase + globalConfig.uris.users, data);
      },
      setNewTown: function(data){
        return $http.post(urlBase + globalConfig.uris.town, data);
      }
    };
}]);
