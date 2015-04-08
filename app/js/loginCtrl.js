jobbaExtraApp.controller('LoginCtrl',function ($scope, $location, Jobb) {
  $scope.credentials = {
    email: '',
    password: ''
  };

  $scope.message = function(){
    return Jobb.getLoginMessage();
  }
  
  $scope.loggedInUser = Jobb.getLoggedInUser();

  $scope.loggedIn = function(){
    return Jobb.isLoggedIn();  
  }
  
  $scope.hasLoginMessage = function(){
    if(Jobb.getLoginMessage() === ""){
      return false;
    } else {
      return true;
    }
  } 

  $scope.setUserAsRequested = function(){
    Jobb.setRequestedUserType("user");
  }

  $scope.login = function (credentials) {
    Jobb.login.get({email:credentials['email'],password:credentials['password']},function(data){
      console.log(data);
      if(data['valid']){
        Jobb.setLoginMessage("");
        Jobb.setLoggedIn(true);
        Jobb.setLoggedInUser(data["username"]);
        Jobb.setRole(data["role"]);
        Jobb.createSession(data['sessionID'],data['userID'],data['role'],data['username'],data["token"]);
        Jobb.getSavedJobsFromDb();
        $location.path("/home");
      } else {
        Jobb.setLoginMessage("Ogiltigt användarnamn eller lösenord, försök igen!");
      }
    });
  }

  $scope.logout = function(){
    Jobb.setLoggedIn(false);
    Jobb.setRole("guest");
    Jobb.setLoggedInUser("");
    Jobb.terminateSession.get({},function(data){
    });
    Jobb.killSession();
    $scope.message = "Du är nu utloggad";
  }
})