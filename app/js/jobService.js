jobbaExtraApp.factory('Jobb',function ($resource, $cookieStore, $http) {
  var savedJobs = [];
  var searchResults = [];
  var loginMessage = "";
  var pendingQuery;
  var requestedUserType = "user";

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
      }
    })
  } else {
    var loggedIn = false;
    var role = "guest";
    var loggedInUser = "";
  }

  this.getSavedJobsFromDb = function(){
    $http.get('php/getSavedJobs.php').success(function(data){
      if(data["valid"]){
        savedJobs = data["savedJobs"];
      } else {
        console.log("Failed to get saved jobs from DB");
      }
    })
  }

  this.getJobs = $resource('php/getJobs.php');
  this.getJob = $resource('php/getJob.php');
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
    searchResults = results;
  }

  this.getSearchResults = function(){
    return searchResults;
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
  }

  this.getCountyList = function(){
    return countyIDs;
  }

  // List of all countys and IDs
  var countyIDs = [{
  "id": 10,
  "namn": "Blekinge län",
  },
  {
  "id": 20,
  "namn": "Dalarnas län",
  },
  {
  "id": 9,
  "namn": "Gotlands län",
  },
  {
  "id": 21,
  "namn": "Gävleborgs län",
  },
  {
  "id": 13,
  "namn": "Hallands län",
  },
  {
  "id": 23,
  "namn": "Jämtlands län",
  },
  {
  "id": 6,
  "namn": "Jönköpings län",
  },
  {
  "id": 8,
  "namn": "Kalmar län",
  },
  {
  "id": 7,
  "namn": "Kronobergs län",
  },
  {
  "id": 25,
  "namn": "Norrbottens län",
  },
  {
  "id": 12,
  "namn": "Skåne län",
  },
  {
  "id": 1,
  "namn": "Stockholms län",
  },
  {
  "id": 4,
  "namn": "Södermanlands län",
  },
  {
  "id": 3,
  "namn": "Uppsala län",
  },
  {
  "id": 17,
  "namn": "Värmlands län",
  },
  {
  "id": 24,
  "namn": "Västerbottens län",
  },
  {
  "id": 22,
  "namn": "Västernorrlands län",
  },
  {
  "id": 19,
  "namn": "Västmanlands län",
  },
  {
  "id": 14,
  "namn": "Västra Götalands län",
  },
  {
  "id": 18,
  "namn": "Örebro län",
  },
  {
  "id": 5,
  "namn": "Östergötlands län",
  },
  {
  "id": 90,
  "namn": "Ospecificerad arbetsort",
  }
];
  return this;
});