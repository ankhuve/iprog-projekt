jobbaExtraApp.factory('Jobb',function ($resource, $cookieStore, $http) {
  var savedJobs = [];
  var searchResults = [];
  var loginMessage = "";
  var pendingQuery;

  if($cookieStore.get("pendingID")!=undefined){
    var pendingID = $cookieStore.get("pendingID");
  }

  if($cookieStore.get("token") != undefined){
    var loggedIn = true;
    var role = $cookieStore.get("role");
    var loggedInUser = $cookieStore.get("username");
    $http.get('php/getSavedJobs.php').success(function(data){
      if(data["valid"]){
        savedJobs = data["savedJobs"];
        // console.log("Valid data, saving jobs");
        // console.log(savedJobs);
      }
    })
  } else {
    var loggedIn = false;
    var role = "guest";
    var loggedInUser = "";
  }

  this.getJobs = $resource('php/getShit.php');
  this.getJob = $resource('php/getJob.php');
  this.removeSaved = $resource('php/deleteSavedJob.php');
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
    console.log("logged in user set: "+username);
    loggedInUser = username;
  }

  this.getLoggedInUser = function(){
    return loggedInUser;
  }

  this.addPendingQuery = function(query){
    pendingQuery = query;
  }

  this.getPendingQuery = function(){
    return pendingQuery;
  }

  this.removePendingQuery = function(){
    pendingQuery = null;
  }

  this.addSearchResults = function(results){
    searchResults = results;
  }

  this.getSearchResults = function(){
    return searchResults;
  }

  this.addSavedJob = function(job){
    console.log("Saving job:");
    console.log(job);
    savedJobs.push(job);
  }

  this.removeSavedJob = function(id){
    for(var job in savedJobs){
      if(savedJobs[job].jobID === id){
        console.log("Job found!");
        savedJobs.splice(job,1);
      }
    }
    console.log(savedJobs);
  }

  this.getSavedJobs = function(){
    return savedJobs;
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