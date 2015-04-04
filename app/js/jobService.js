jobbaExtraApp.factory('Jobb',function ($resource, $cookieStore,$http) {
  var savedJobs = [];
  var searchResults = [];
  var loginMessage = "";
  // var pendingJob = {};

  if($cookieStore.get("pendingID")!=undefined){
    // console.log("Pending ID cookie found!");
    var pendingID = $cookieStore.get("pendingID");
    // console.log("Pending ID: "+pendingID)
  }

  if($cookieStore.get("token") != undefined){
    var loggedIn = true;
    var role = $cookieStore.get("role");
    var loggedInUser = $cookieStore.get("username");
  } else {
    var loggedIn = false;
    var role = "guest";
    var loggedInUser = "";
  }

  this.getJobs = $resource('php/getShit.php');
  this.getJob = $resource('php/getJob.php');
  this.login  = $resource('php/login.php');
  this.checkLogin = $resource('php/checkLogin.php');
  this.terminateSession = $resource('php/terminateSession.php');

  this.getLoginMessage = function(){
    return loginMessage;
  }

  this.setLoginMessage = function(message){
    loginMessage = message;
  }

  this.addPendingID = function(annonsID){
    $cookieStore.put("pendingID",annonsID);
    pendingID = annonsID;
  }

  this.removePendingID =function(){
    $cookieStore.remove("pendingID");
    pendingID = "";
  }

  this.getPendingID = function(){
    return pendingID;
  }

  // this.addPendingJob =  function(jobb){
  //   console.log(jobb);
  //   pendingJob = jobb;
  // }

  // this.removePendingJob = function(){
  //   pendingJob = {};
  // }

  // this.getPendingJob = function(){
  //   return  pendingJob;
  // }

  this.setRole = function(inputRole){
    role = inputRole;
  }

  this.getRole = function(){
    return role;
  }

  this.setLoggedIn = function(value){
    loggedIn = value;
  }

  this.isLoggedIn = function(){
    return loggedIn;
  }

  this.setLoggedInUser = function(username){
    loggedInUser = username;
  }

  this.getLoggedInUser = function(){
    return loggedInUser;
  }

  this.addSearchResults = function(results){
    searchResults = results;
  }

  this.getSearchResults = function(){
    return searchResults;
  }

  this.createSession = function(sessionID, userID, userRole, username, token){
    $cookieStore.put("sessionID", sessionID);
    $cookieStore.put("userID", userID);
    $cookieStore.put("token", token);
    $cookieStore.put("role", userRole);
    $cookieStore.put("username",username);
  }

  this.killSession = function(){
    $cookieStore.remove("sessionID");
    $cookieStore.remove("userID");
    $cookieStore.remove("token");
    $cookieStore.remove("role");
    $cookieStore.remove("username");
  }
  
  return this;

});