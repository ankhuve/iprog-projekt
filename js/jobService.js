jobbaExtraApp.factory('Jobb',function ($resource, $cookieStore) {
  var savedJobs = [];
  var searchResults = [];
  // var loggedIn = false;
  var session = {};

  var userRoles = {
    all: "*",
    user: "user",
    company: "company",
    admin: "admin"
  }

  this.loggedIn = false;
  // this.loggedIn = function(){
  //   return  loggedIn;
  // }

  this.getJobs = $resource('php/getShit.php');
  this.login  = $resource('php/login.php');

  this.addSearchResults = function(results){
    console.log(results);
    searchResults = results;
  }

  this.getSearchResults = function(results){
    return searchResults;
  }

  this.createSession = function(sessionID, userID, role){
    session['sessionID'] =  sessionID;
    session["userID"] = userID;
    session["role"] = role;
    this.loggedIn = true;
    console.log(session);
    // $rootScope.loggedIn = role;
  }


  return this;

});

// jobbaExtraApp.factory('AuthService', function ($http, Session) {
//   var authService = {};
 
//   authService.login = function (credentials) {
//     return $http.post('php/login.php', credentials).then(function (res) {
//       console.log(res);
//         // Session.create(res.data.id, res.data.user.id,
//         // res.data.user.role);
//         // return res.data.user;
//       });
//   };
 
//   authService.isAuthenticated = function () {
//     return !!Session.userId;
//   };
 
//   authService.isAuthorized = function (authorizedRoles) {
//     if (!angular.isArray(authorizedRoles)) {
//       authorizedRoles = [authorizedRoles];
//     }
//     return (authService.isAuthenticated() &&
//       authorizedRoles.indexOf(Session.userRole) !== -1);
//   };
 
//   return authService;
// })

// jobbaExtraApp.controller('ApplicationController', function ($scope,
//                                                USER_ROLES,
//                                                AuthService) {
//   $scope.currentUser = null;
//   $scope.userRoles = USER_ROLES;
//   $scope.isAuthorized = AuthService.isAuthorized;
 
//   $scope.setCurrentUser = function (user) {
//     $scope.currentUser = user;
//   };
// })

