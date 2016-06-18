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
          if(localStorage){
              localStorage.setItem("language", JSON.stringify(data));
          }
      },
      getData: function(key){
        if(localStorage){
          data = localStorage.getItem(key)
          //data = (data && (data.indexOf("{") == 0 || data.indexOf("[") == 0)) ? JSON.parse(data) : data;
          return (data) ? data : false;
        }
        return false;
      },
      setData: function(key, value){
        window.value = value;
        if(typeof value == "object"){
          value = JSON.stringify(value);
        }
        if(localStorage){
          localStorage.setItem(key, value);
        }else{
          console.log("nope");
          //localStorage.setItem(key, value);
        }
      }
    };
}]);
