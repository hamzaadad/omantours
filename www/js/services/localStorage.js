app
    .factory('LocalFactory', ['$http', function($http) {

    return {
      getUser: function(){
        if(localStorage){
          return {
            "first_name": localStorage.getItem("first_name"),
            "id": localStorage.getItem("id"),
            "type": localStorage.getItem("type"),
          }
        }
        return false;
      },
      setUser: function(userData){
        if(localStorage){
          localStorage.setItem("first_name", userData.first_name);
          localStorage.setItem("id", userData.id);
          localStorage.setItem("type", userData.type);
        }
      },
      getLanguage: function(){
        if(localStorage){
          return JSON.parse(localStorage.getItem("language"));
        }
        return;
      },
      setLanguage: function(data){
        console.log("local", data);
          if(localStorage){
              localStorage.setItem("language", JSON.stringify(data));
          }
      }
    };
}]);
