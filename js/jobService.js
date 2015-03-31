jobbaExtraApp.factory('Jobb',function ($resource, $cookieStore) {
  var savedJobs = [];
  var searchResults = [];
  var session = {};
  var loggedIn = false;
  var role = "guest";

  this.getJobs = $resource('php/getShit.php');
  this.login  = $resource('php/login.php');
  this.checkLogin = $resource('php/checkLogin.php');
  this.terminateSession = $resource('php/terminateSession.php');

  this.getRole = function(){
    return role;
  }

  this.isLoggedIn = function(){
    return loggedIn;
  }

  this.addSearchResults = function(results){
    searchResults = results;
  }

  this.getSearchResults = function(){
    return searchResults;
  }

  this.createSession = function(sessionID, userID, userRole, username){
    session['sessionID'] =  sessionID;
    session["userID"] = userID;
    session["role"] = role;
    session["username"] = username;
    loggedIn = true;
    role = userRole;
  }

  this.killSession = function(){
    session = {};
  }

  this.getSession = function(){
    return session;
  }
  
  return this;

});