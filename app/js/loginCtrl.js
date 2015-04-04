jobbaExtraApp.controller('LoginCtrl',function ($scope, $location, Jobb) {
  $scope.credentials = {
    email: '',
    password: ''
  };

  $scope.message = Jobb.getLoginMessage();
  $scope.loggedIn = Jobb.isLoggedIn();
  $scope.loggedInUser = Jobb.getLoggedInUser();

  $scope.login = function (credentials) {
    Jobb.login.get({email:credentials['email'],password:credentials['password']},function(data){
      console.log(data);
      if(data['valid']){
        Jobb.setLoginMessage("");
        $scope.message = '';
        Jobb.setLoggedIn(true);
        Jobb.setLoggedInUser(data["username"]);
        Jobb.setRole(data["role"]);
        $scope.$parent.loggedIn = true;
        $scope.$parent.username = data["username"];
        Jobb.createSession(data['sessionID'],data['userID'],data['role'],data['username'],data["token"]);
        $location.path("/home");
      } else {
        $scope.message = "Ogiltigt användarnamn eller lösenord, försök igen!";
      }
    });
  }

  $scope.logout = function(){
    Jobb.setLoggedIn(false);
    Jobb.setRole("guest");
    Jobb.setLoggedInUser("");
    $scope.loggedIn = false;
    $scope.$parent.loggedIn = false;
    $scope.$parent.username = "";
    Jobb.terminateSession.get({},function(data){
      console.log(data)});
    Jobb.killSession();
    $scope.message = "Du är nu utloggad";
  }
})