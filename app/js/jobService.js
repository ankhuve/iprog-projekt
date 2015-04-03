jobbaExtraApp.factory('Jobb',function ($resource, $cookieStore) {
  var savedJobs = [];
  var searchResults = [];
  var session = {};
  var loggedIn = false;
  var role = "guest";
  var loggedIn = false;
  var loginMessage = "";

  this.getJobs = $resource('php/getShit.php');


  // this.searchJobs = function(url){
  //   $http.jsonp(url)
  //   .success(function(data){
  //       console.log(data.found);
  //   });
  // }
  // var url = "http://public-api.wordpress.com/rest/v1/sites/wtmpeachtest.wordpress.com/posts?callback=JSON_CALLBACK";


  // this.searchJobs = $resource('http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning',{callback: "JSON_CALLBACK"},{ get: {method: "JSONP"}});
    // http://www.tastekid.com/api/similar?k=76627-TasteMe-RG4042W1',{limit:40,callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});

  this.login  = $resource('php/login.php');
  this.checkLogin = $resource('php/checkLogin.php');
  this.terminateSession = $resource('php/terminateSession.php');

  this.getLoginMessage = function(){
    return loginMessage;
  }

  this.setLoginMessage = function(message){
    loginMessage = message;
  }

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
    role = "guest";
    loggedIn = false;
    session = {};
  }

  this.getSession = function(){
    return session;
  }
  
  return this;

});