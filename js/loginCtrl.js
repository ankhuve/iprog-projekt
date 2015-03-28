jobbaExtraApp.controller('LoginCtrl',function ($scope, Jobb) {
  $scope.credentials = {
    username: '',
    password: ''
  };


  $scope.login = function (credentials) {
    $scope.loggedIn = false;
    Jobb.login.get({username:credentials['username'],password:credentials['password']},function(data){
      if(data['valid']){
        $scope.loggedIn = true;
        $scope.username = data['username'];
        Jobb.createSession(1,1,"admin");
      }
      // console.log(data);

    });
  }
})