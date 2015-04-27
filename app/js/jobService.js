jobbaExtraApp.factory('Jobb',function ($resource, $cookieStore, $http) {
  var savedJobs = [];
  var searchResults = [];
  var loginMessage = "";
  var pendingQuery;
  var requestedUserType = "user";
  var numHits = 0;

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
      } else {
        console.log("Invalid token!");
      }
    })
  } else {
    var loggedIn = false;
    var role = "guest";
    var loggedInUser = "";
  }

  this.getSavedJobsFromDb = $resource('php/getSavedJobs.php');

  this.getJobs = $resource('php/getJobs.php');
  this.getJob = $resource('php/getJob.php');

  // this.getLan = $resource('php/getLan.php');
  this.getCategory = $resource('php/getCategory.php');
  this.getYrkesgrupper = $resource('php/getYrkesgrupper.php');
  this.getKommun = $resource('php/getKommun.php');

  this.removeSaved = $resource('php/deleteSavedJob.php');
  this.login = $resource('php/login.php');
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
    // console.log(results);
    searchResults = results;
  }

  this.getSearchResults = function(){
    // console.log("Get search results called!");
    return searchResults;
  }

  this.setNumHits = function(hits){
    console.log("Set num hits to: "+hits);
    numHits = hits;
  }

  this.getNumHits = function(){
    return numHits;
  }

  this.addSavedJob = function(job){
    savedJobs.push(job);
  }

  this.removeSavedJob = function(id){
    for(var job in savedJobs){
      if(savedJobs[job].jobID === id){
        savedJobs.splice(job,1);
      }
    }
  }

  this.getSavedJobs = function(){
    return savedJobs;
  }

  this.clearSavedJobs = function(){
    savedJobs = [];
  }

  this.getRequestedUserType = function(){
    return requestedUserType;
  }

  this.setRequestedUserType = function(userType){
    requestedUserType = userType;
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
    if($cookieStore.get("pendingID")!=undefined){
      this.removePendingID();
    };
  }

  return this;
});