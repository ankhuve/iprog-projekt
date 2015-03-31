jobbaExtraApp.controller('LoginCtrl',function ($scope, Jobb) {
  $scope.credentials = {
    email: '',
    password: ''
  };

  $scope.loggedIn = Jobb.isLoggedIn();
  $scope.login = function (credentials) {
    console.log(credentials);
    $scope.loggedIn = false;
    Jobb.login.get({email:credentials['email'],password:credentials['password']},function(data){
      console.log(data);
      if(data['valid']){
        $scope.message = '';
        $scope.loggedIn = true;
        $scope.username = data['username'];
        Jobb.createSession(data['sessionID'],data['userID'],data['role'],data['username']);
      } else {
        $scope.message = "Ogiltigt användarnamn eller lösenord, försök igen!";
      }
    });
  }
})