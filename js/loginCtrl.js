jobbaExtraApp.controller('LoginCtrl',function ($scope, $location, Jobb) {
  $scope.credentials = {
    email: '',
    password: ''
  };

  $scope.message = Jobb.getLoginMessage();

  $scope.loggedIn = Jobb.isLoggedIn();
  $scope.login = function (credentials) {
    console.log(credentials);
    $scope.loggedIn = false;
    Jobb.login.get({email:credentials['email'],password:credentials['password']},function(data){
      console.log(data);
      if(data['valid']){
        Jobb.setLoginMessage("");
        $scope.message = '';
        $scope.loggedIn = true;
        $scope.$parent.loggedIn = true;
        $scope.$parent.username = data["username"];
        $scope.username = data['username'];
        Jobb.createSession(data['sessionID'],data['userID'],data['role'],data['username']);
        $location.path("/home");
      } else {
        $scope.message = "Ogiltigt användarnamn eller lösenord, försök igen!";
      }
    });
  }

  $scope.logout = function(){
    $scope.loggedIn = false;
    $scope.$parent.loggedIn = false;
    delete $scope.$parent.username;
    Jobb.terminateSession;
    Jobb.killSession();
    // Jobb.setLoginMessage("Du är nu utloggad.");
    // $scope.message = Jobb.getMessage();
    $scope.message = "Du är nu utloggad";
  }
})